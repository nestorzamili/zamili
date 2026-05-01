#!/usr/bin/env bash
set -euo pipefail

readonly DEPLOY_PATH="/opt/zamili"
readonly SSH_DIR="$(mktemp -d)"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly COMPOSE_FILE="$SCRIPT_DIR/docker-compose.prod.yml"

cleanup() {
  rm -rf "$SSH_DIR"
}
trap cleanup EXIT

require_env() {
  local name="$1"
  if [ -z "${!name:-}" ]; then
    echo "Missing required environment variable: $name" >&2
    exit 1
  fi
}

write_variable_to_file() {
  local name="$1"
  local destination="$2"
  local mode="$3"
  local value="${!name}"

  if [ -f "$value" ]; then
    cp "$value" "$destination"
  else
    printf '%s\n' "$value" >"$destination"
  fi

  chmod "$mode" "$destination"
}

require_env IMAGE_REF
require_env VM_SSH_TARGET
require_env VM_SSH_KEY
require_env VM_SSH_KNOWN_HOSTS

write_variable_to_file VM_SSH_KEY "$SSH_DIR/id_ed25519" 600
write_variable_to_file VM_SSH_KNOWN_HOSTS "$SSH_DIR/known_hosts" 644

if [[ ! "$VM_SSH_TARGET" =~ ^([^@]+)@([^:]+):([0-9]+)$ ]]; then
  echo "VM_SSH_TARGET must use the format user@host:port" >&2
  exit 1
fi

VM_USER="${BASH_REMATCH[1]}"
VM_HOST="${BASH_REMATCH[2]}"
VM_SSH_PORT="${BASH_REMATCH[3]}"

SSH_OPTS=(
  -i "$SSH_DIR/id_ed25519"
  -o IdentitiesOnly=yes
  -o StrictHostKeyChecking=yes
  -o UserKnownHostsFile="$SSH_DIR/known_hosts"
  -p "$VM_SSH_PORT"
)
SCP_OPTS=(
  -i "$SSH_DIR/id_ed25519"
  -o IdentitiesOnly=yes
  -o StrictHostKeyChecking=yes
  -o UserKnownHostsFile="$SSH_DIR/known_hosts"
  -P "$VM_SSH_PORT"
)
SSH_TARGET="$VM_USER@$VM_HOST"

ssh "${SSH_OPTS[@]}" "$SSH_TARGET" "mkdir -p '$DEPLOY_PATH' '/var/log/zamili'"
scp "${SCP_OPTS[@]}" "$COMPOSE_FILE" "$SSH_TARGET:$DEPLOY_PATH/docker-compose.yml"

printf -v q_image_ref '%q' "$IMAGE_REF"
printf -v q_deploy_path '%q' "$DEPLOY_PATH"

ssh "${SSH_OPTS[@]}" "$SSH_TARGET" \
  "IMAGE_REF=$q_image_ref DEPLOY_PATH=$q_deploy_path bash -se" <<'EOF'
set -euo pipefail

cd "$DEPLOY_PATH"
IMAGE_REF="$IMAGE_REF" docker compose config -q
IMAGE_REF="$IMAGE_REF" docker compose pull
IMAGE_REF="$IMAGE_REF" docker compose up -d --remove-orphans

attempt=0
while [ "$attempt" -lt 20 ]; do
  status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}running{{end}}' zamili 2>/dev/null || true)"

  if [ "$status" = "healthy" ] || [ "$status" = "running" ]; then
    image_repo="${IMAGE_REF%:*}"
    for candidate in $(docker image ls "$image_repo" --format '{{.Repository}}:{{.Tag}}'); do
      if [ "$candidate" != "$IMAGE_REF" ]; then
        docker image rm -f "$candidate" >/dev/null 2>&1 || true
      fi
    done
    exit 0
  fi

  if [ "$status" = "unhealthy" ]; then
    docker compose ps
    echo "Container zamili reported unhealthy after deploy" >&2
    exit 1
  fi

  attempt=$((attempt + 1))
  sleep 3
done

docker compose ps
echo "Timed out waiting for zamili to become healthy" >&2
exit 1
EOF
