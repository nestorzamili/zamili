# Zamili

Personal portfolio (React + Vite, nginx).

## Local Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## CI/CD

- PR → [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- main → [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) via [gha-workflows](https://github.com/nestorzamili/gha-workflows)

Environment `production` secrets: `SSH_CONFIG` only.

VM (sekali): Docker, network `proxy`, Caddy, `/var/log/zamili` for nginx logs.

## License

MIT
