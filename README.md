# Bun Monorepo Starter

A simple and scalable monorepo setup powered by [Bun](https://bun.sh/), designed for modern JavaScript and TypeScript applications.

## Features

- **Bun** as the primary package manager and runtime
- Easy-to-use monorepo structure for apps and services
- Concurrently run multiple apps and services with ease
- Shared packages for common utilities and types
- Simple build and development flow

## Folder Structure

```
/repo-root
│
├── /apps                # Applications (e.g., frontend)
│   └── /website         # Example website app
│
├── /services            # Backend services (e.g., APIs)
│   └── /key-service     # Example key management service
│
└── /packages            # Shared libraries and packages
    ├── /client          # Shared API clients
    ├── /common          # Common utilities
    └── /types           # Shared TypeScript types
```

## Installation

### Using Bun CLI (Recommended)

Create a new project using Bun CLI with the following command:

```sh
bun create ivanoliverfabra/bun-mono-starter <your-project-name>
```

This will set up the project for you automatically.

### Manual Installation

Alternatively, you can clone this repository and set it up manually:

```sh
git clone https://github.com/ivanoliverfabra/bun-mono-starter.git

cd bun-mono-starter

bun install
```

## Development

### Running Apps and Services

To start the development environment and run apps and services concurrently, use the following command:

```sh
bun run dev
```

This will run the `website` and `key-service` concurrently, with outputs color-coded for easy debugging.

### Building Apps and Services

To build all apps and services, run:

```sh
bun run build
```

### Adding New Apps or Services

To add a new app or service, simply create a new folder under `/apps` or `/services` and follow the existing structure.

## License

This project is licensed under the MIT License.
