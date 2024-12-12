# Mezbani

A modern restaurant management system built with Next.js and Material-UI.

## Tech Stack

- **Framework:** Next.js 15.0.0 (React 18)
- **UI Components:** Material-UI (MUI) v5
- **Styling:** Emotion for styled components
- **Forms:** React Hook Form
- **Payment Processing:** Square Web SDK & API
- **Backend Services:** Firebase & Firebase Admin
- **Language:** TypeScript
- **Development Tools:**
  - ESLint for code linting
  - Sharp for image optimization
  - Critters for CSS inlining

## Project Structure

```
.
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable React components
│   ├── lib/          # Shared utilities and API clients
│   ├── types/        # TypeScript type definitions
│   └── theme.ts      # Material-UI theme configuration
├── public/           # Static assets
├── scripts/         # Build and utility scripts
└── tsconfig.json    # TypeScript configuration
```

## Features

- Modern React development with Next.js App Router
- Server-side rendering and static site generation
- Integrated payment processing with Square
- Firebase backend integration
- Type-safe development with TypeScript
- Responsive Material Design UI
- Optimized image processing
- Environment-based configuration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run populate-catalog` - Populate Square catalog data

## Development

This project follows Next.js best practices and conventions. The App Router architecture is used for routing and layouts. Material-UI components are used for the user interface, with custom styling applied through Emotion.

For more information about the technologies used:
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/)
- [Square Web SDK Documentation](https://developer.squareup.com/docs/web-sdk)
