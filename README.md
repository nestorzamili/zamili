# Zamili

Personal portfolio website built as a static React app and served with nginx.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Runtime**: nginx (static assets)

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Docker

```bash
docker build -t zamili .
docker run -p 8080:80 zamili
```

## License

MIT
