# Zamili

Personal portfolio website built with TanStack Start.

## Tech Stack

- **Framework**: TanStack Start (React 19)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Email**: Resend

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
node .output/server/index.mjs
```

## Docker

```bash
docker build -t zamili .
docker run -p 3000:3000 \
  -e RESEND_API_KEY=xxx \
  -e EMAIL_RECIPIENT=xxx \
  zamili
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key for Resend email service |
| `EMAIL_RECIPIENT` | Email address to receive contact form |

## License

MIT
