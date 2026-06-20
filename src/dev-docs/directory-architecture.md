# Sentinel Matrix Client Directory Architecture

This project is a Vite React app. Unlike Next.js, Vite does not treat a
`pages` directory as a routing system. Routes are explicit React Router
definitions, and `pages` is just a normal folder by convention.

## Top-Level App Flow

- `index.html`
  - Vite's HTML entry file.
  - Owns document-level metadata, favicon, root mount node, and external font
    loading.

- `src/main.jsx`
  - React entry point.
  - Mounts the app into `#root`.
  - Owns global providers such as `BrowserRouter`, app-wide context providers,
    query clients, or theme providers.
  - Imports `src/index.css` once.

- `src/App.jsx`
  - Top-level application component.
  - Should stay thin.
  - Delegates route definitions to `src/routes`.

- `src/index.css`
  - Global CSS, Tailwind import, design tokens, base styles, and shared utility
    classes.
  - This is the right place for the Sentinel Matrix visual language: colors,
    typography, body background, focus states, card helpers, and common
    app-wide classes.

- `src/App.css`
  - Optional component-specific CSS for `App.jsx`.
  - If `App.jsx` does not import it and no component uses those selectors, it is
    not doing anything.
  - Prefer keeping global styling in `index.css`; use component CSS only when a
    specific component needs styles that are awkward or noisy as Tailwind
    classes.

## Source Folders

- `src/routes/`
  - Route configuration and route guards.
  - Good examples: `AppRoutes.jsx`, `Authorized.jsx`.
  - This folder decides which page renders for each URL.
  - Keep router provider setup out of this folder; `BrowserRouter` should live in
    `main.jsx` or another top-level provider component.

- `src/pages/`
  - Route-level screens.
  - A page is something you would naturally navigate to by URL, such as
    `LandingPage`, `Dashboard`, `Login`, `Students`, `StudentDetail`, or
    `Analytics`.
  - Pages compose smaller components, call hooks/services when needed, and pass
    data down.
  - In Vite React, this folder is conventional and common, but it is not
    automatic routing like Next.js.

- `src/components/`
  - Reusable UI and feature components.
  - Components should usually not own route definitions.
  - If a component is reused across multiple pages, it belongs here.

- `src/components/ui/`
  - Generic, design-system-style primitives.
  - Good examples: `Button`, `Card`, `Input`, `Modal`, `Table`, `Badge`,
    `Spinner`.
  - These should be domain-neutral and reusable across Sentinel Matrix.
  - Avoid importing business services directly from UI primitives.

- `src/components/layout/`
  - App shell and structural components when they are added.
  - Good examples: `Layout`, `Navbar`, `Sidebar`, `Footer`, `TopBar`.
  - These components can compose UI primitives and navigation links.

- `src/components/[feature]/`
  - Feature-specific components that are shared by pages within one feature.
  - Good examples: `components/students/StudentRiskCard.jsx`,
    `components/courses/CourseTable.jsx`, or
    `components/analytics/RiskTrendChart.jsx`.
  - Use this when a component is too specific for `components/ui` but not itself
    a full page.

- `src/assets/`
  - Static assets imported by React components.
  - Good examples: local images, SVGs, diagrams, or generated visual assets.
  - Assets referenced directly by URL without importing can also live in
    `public/`.

- `src/contexts/`
  - React context providers and context hooks.
  - Good examples: auth context, theme context, current organization context.
  - Keep provider setup near `main.jsx` or `App.jsx`.

- `src/services/`
  - API clients and integration functions.
  - Good examples: `authService.js`, `studentService.js`, `courseService.js`.
  - Keep fetch logic here instead of scattering raw API calls through pages.

- `src/utils/`
  - Pure helpers that are not tied to React rendering.
  - Good examples: date formatting, risk score formatting, class name helpers,
    validation helpers.

- `src/dev-docs/`
  - Developer documentation and planning artifacts.
  - Good examples: architecture notes, ERD files, API notes, setup guides, design
    conventions.
  - These files are for humans and should not be imported by the app.

## Naming Guidelines

- Use `PascalCase.jsx` for React components and pages.
- Use `camelCase.js` for plain JavaScript helpers and services.
- Use named exports for collections of related utilities.
- Default exports are fine for single primary components such as `Button` or a
  page component.

## Practical Rule Of Thumb

Ask what role the file plays:

- Navigated to by URL: put it in `src/pages`.
- Reused visual primitive: put it in `src/components/ui`.
- Reused app structure: put it in `src/components/layout`.
- Reused feature-specific widget: put it in `src/components/[feature]`.
- URL mapping or auth gate: put it in `src/routes`.
- Talks to the backend: put it in `src/services`.
- Pure helper: put it in `src/utils`.
- Project notes for developers: put it in `src/dev-docs`.
