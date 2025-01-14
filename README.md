# Infinite Scroll Users

A web application that displays user cards in an infinite scroll feed, fetching data from the randomuser.me API.
Built with Vue 3, TypeScript, Pinia for state management, and SCSS for styling.

## Tech Stack

- Vue 3.4
- TypeScript 5.3
- Pinia 2.1
- Vite 5.0
- SCSS
- ESLint + Stylelint

## Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

## Installation

1. Clone the repository:
```bash
git clone [repository url]
cd [repository name]
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:4040`

### Production Build

```bash
npm run build
```

Built files will be located in the `dist` directory

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - starts development server
- `npm run build` - builds for production
- `npm run preview` - previews production build
- `npm run lint` - lints and fixes JavaScript/TypeScript
- `npm run lint:style` - lints and fixes styles
- `npm run type-check` - runs TypeScript type checking

## Project Structure

```
src/
├── assets/          # static assets
├── components/      # Vue components
├── composables/     # composition functions
├── router/          # Vue Router configuration
├── services/        # API services
├── utils/           # utility functions
├── views/           # route views
├── App.vue          # root component
└── main.ts          # entry point
```

## Linting and Formatting

The project is configured with:
- ESLint for JavaScript/TypeScript
- Stylelint for SCSS/Vue SFC styles

## IDE Setup

We recommend using VSCode with the following extensions:
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Stylelint

## License

MIT