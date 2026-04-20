# Character Listing App

A React application for browsing characters from the Rick and Morty API. Built with Vite, TypeScript, shadcn/ui, and Tailwind CSS.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Features

- React + Vite + TypeScript
- Tailwind CSS v4
- shadcn/ui components
- react-router-dom for routing
- Biome for linting and formatting

## Exercise: Rick and Morty Character Listing

### Requirements

- Fetch characters from the [Rick and Morty API](https://rickandmortyapi.com/api)
- Display characters as cards showing name, image, and status (alive/dead)
- Implement pagination using the `page` query parameter
- Filter characters by status (alive, dead) using a selector
- Filter characters by name using a text input

### Component Structure

- `Character` - Card component for individual character display
- List container with pagination and filters

## Project Structure

```
character-listing-app/
├── public/            # Public assets
├── src/               # Application source code
│   ├── components/    # React components
│   │   ├── ui/       # shadcn/ui base components
│   │   └── ...       # App-specific components
│   ├── contexts/     # React contexts
│   ├── config/       # Configuration files
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   ├── App.tsx       # Application entry point
│   ├── index.css     # Main styles and Tailwind
│   ├── main.tsx      # Main rendering file
│   └── Router.tsx    # Routes configuration
├── index.html        # HTML entry point
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── biome.json        # Biome configuration
```

## License

This project is licensed under the MIT License.
