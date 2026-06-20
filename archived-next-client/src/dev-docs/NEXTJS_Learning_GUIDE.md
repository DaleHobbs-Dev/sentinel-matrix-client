# Sentinel Matrix Next.js Learning Guide

This guide explains the parts of Next.js that matter most for this client repo. It is written with Sentinel Matrix frontend in mind.

Sentinel Matrix uses **Next.js 16**, **React 19**, the **App Router**, plain JavaScript files, and Tailwind CSS utility classes. The main job of this frontend is to give instructors a clean dashboard experience for courses, students, enrollments, assessments, and risk indicators that come from the Django API.

> Important: this project uses the **App Router** in `src/app`. Do not follow older tutorials that use a `pages/` folder, `_app.js`, `getLayout`, or `next/router`. Those belong to the older Pages Router.

---

## 1. Project Mental Model

Think of this client in four layers:

```txt
URL route
  -> page file in src/app
  -> shared UI components from src/components
  -> API helpers/constants from src/lib
  -> Django backend
```

The main folders are:

| Folder | Purpose |
| --- | --- |
| `src/app` | App Router routes, root layout, and global CSS |
| `src/components` | Reusable UI pieces like cards, buttons, layout, tables, badges |
| `src/lib` | API helper functions and shared constants |
| `src/dev-docs` | Project learning notes like this guide |
| `public` | Static assets served directly by Next.js |

When something breaks, start by asking:

1. What URL am I on?
2. Which file in `src/app` owns that URL?
3. Which components does that page render?
4. Is the data hardcoded for now, or coming from `src/lib/api.js`?

---

## 2. App Router Routes

In the App Router, folders create route segments and `page.js` files create pages.

This file:

```txt
src/app/dashboard/page.js
```

creates this route:

```txt
/dashboard
```

A folder with square brackets creates a dynamic route.

This file:

```txt
src/app/courses/[courseId]/page.js
```

creates routes like:

```txt
/courses/1
/courses/42
```

### Current Routes

| File | URL |
| --- | --- |
| `src/app/page.js` | `/` |
| `src/app/login/page.js` | `/login` |
| `src/app/register/page.js` | `/register` |
| `src/app/dashboard/page.js` | `/dashboard` |
| `src/app/courses/page.js` | `/courses` |
| `src/app/courses/[courseId]/page.js` | `/courses/:courseId` |
| `src/app/students/page.js` | `/students` |
| `src/app/students/[studentId]/page.js` | `/students/:studentId` |
| `src/app/analytics/page.js` | `/analytics` |

### Route Tips

- Add a new page by creating a folder and a `page.js` file.
- The filename must be `page.js` for a route page.
- Dynamic route names should describe the ID, like `[courseId]` or `[studentId]`.
- This project does not use `pages/`, `_app.js`, or `getLayout`.

---

## 3. Root Layout vs App Layout Component

There are two layout ideas in this repo, and they do different jobs.

### `src/app/layout.js`

This is the required Next.js root layout. It wraps the entire app with `<html>` and `<body>`, imports global CSS, and defines metadata.

```js
import "./globals.css"

export const metadata = {
  title: "Sentinel Matrix",
  description: "Student risk dashboard for instructors",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

Use this file for app-wide setup, not page content.

### `src/components/Layout.jsx`

This is the Sentinel Matrix app shell. It adds the teal navbar, the page container, the footer, and the light dashboard background.

Pages that should look like the main app wrap their content in `<Layout>`.

```js
import { Layout, PageHeader } from "@/components"

export default function DashboardPage() {
  return (
    <Layout>
      <PageHeader title="Dashboard" description="Monitor course-level student risk indicators." />
    </Layout>
  )
}
```

Auth pages like `/login` and `/register` currently use `Container` directly because they have a simpler centered form layout.

---

## 4. Components

Reusable UI lives in `src/components`.

Current component examples:

| Component | Use |
| --- | --- |
| `Layout` | Main app shell with navbar, container, footer |
| `Navbar` | Top navigation for dashboard, courses, students, analytics |
| `Container` | Width and spacing wrapper |
| `Card` | Framed content block |
| `Button` | Shared button/link styling |
| `Input`, `Select`, `FormField` | Form controls |
| `PageHeader` | Page title and description |
| `StatCard` | Dashboard metric cards |
| `DashboardSection` | Section wrapper for dashboard content |
| `Table` | Reusable table structure |
| `RiskBadge` | Low/moderate/high risk display |
| `LoadingSpinner`, `EmptyState`, `Modal` | Common UI states and patterns |

Most pages import from the barrel file:

```js
import { Layout, PageHeader, Card } from "@/components"
```

That works because `src/components/index.js` re-exports the components.

### Component Tips

- Put reusable UI in `src/components`, not directly inside one page forever.
- Keep page files focused on page composition and data loading.
- Use existing components before making a new one.
- Keep the Sentinel Matrix style consistent: clean, dashboard-like, teal primary color, light background, rounded but restrained components.

---

## 5. Import Paths

This repo has a path alias configured in `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

That means this:

```js
import { Button } from "@/components"
import { apiRequest } from "@/lib/api"
```

is the same idea as importing from `src/components` or `src/lib/api`, but cleaner.

Use `@/` for imports from inside `src`.

---

## 6. Navigation

Use `Link` from `next/link` for normal navigation.

```js
import Link from "next/link"

<Link href="/dashboard">Dashboard</Link>
<Link href={`/courses/${course.id}`}>View Course</Link>
```

The navbar already uses this pattern.

For navigation after an action, such as redirecting after login or after creating a course, use `useRouter` from `next/navigation`.

```js
"use client"

import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()

  function handleSuccess() {
    router.push("/dashboard")
  }
}
```

Important App Router detail: hooks like `useRouter`, `useState`, and `useEffect` require a Client Component, so the file must start with:

```js
"use client"
```

---

## 7. Server Components and Client Components

In the App Router, components are Server Components by default. That is why many current page files can simply return JSX without `"use client"`.

Server Components are good for static page structure and UI composition.

Client Components are needed when a component uses:

- `useState`
- `useEffect`
- `useRouter`
- browser APIs like `localStorage`
- click handlers and form submission state

Example:

```js
"use client"

import { useState } from "react"

export default function CourseForm() {
  const [title, setTitle] = useState("")

  return (
    <input value={title} onChange={(event) => setTitle(event.target.value)} />
  )
}
```

### Practical Rule

Start pages as Server Components when they are just displaying static shell content. Add `"use client"` only when you need interactivity, browser-only APIs, or React hooks.

---

## 8. Dynamic Route Params

Dynamic folders like `[courseId]` and `[studentId]` expose params to the page.

In a Server Component page, accept `params`:

```js
export default function CourseDetailPage({ params }) {
  const { courseId } = params

  return <p>Course ID: {courseId}</p>
}
```

In a Client Component, use `useParams` from `next/navigation`:

```js
"use client"

import { useParams } from "next/navigation"

export default function CourseDetailClient() {
  const { courseId } = useParams()

  return <p>Course ID: {courseId}</p>
}
```

Use the dynamic ID when calling the Django API for detail pages like course roster or student profile.

---

## 9. API Helpers

API code currently lives in `src/lib/api.js`.

```js
import { API_BASE_URL } from "./constants"

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}
```

The base URL comes from `src/lib/constants.js`:

```js
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
```

So local development defaults to the Django backend at:

```txt
http://localhost:8000
```

If you need a different backend URL, create `.env.local`:

```txt
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Variables used in the browser must start with `NEXT_PUBLIC_`.

### API Helper Tips

- Add resource-specific helper functions as the app grows.
- Keep raw `fetch` calls out of page components when a helper would be clearer.
- Handle auth tokens in one consistent place once login is connected.
- Match frontend field names to Django serializer response fields.

Example future shape:

```js
export function getCourses() {
  return apiRequest("/courses")
}

export function getCourseRoster(courseId) {
  return apiRequest(`/courses/${courseId}/roster`)
}
```

---

## 10. Data Fetching Patterns

This project is still mostly static shell UI. As you connect Django endpoints, you will usually choose between two patterns.

### Server-side fetch

Good for pages that can load data before rendering.

```js
import { apiRequest } from "@/lib/api"

export default async function CoursesPage() {
  const courses = await apiRequest("/courses")

  return (
    <Layout>
      {/* render courses */}
    </Layout>
  )
}
```

### Client-side fetch

Good for pages that need browser-only auth tokens, interactive filters, or loading states controlled in the browser.

```js
"use client"

import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"

export default function CoursesClient() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    apiRequest("/courses")
      .then(setCourses)
      .finally(() => setIsLoading(false))
  }, [])
}
```

For this MVP, client-side fetching may be easiest for authenticated dashboard flows because token storage will likely involve the browser.

---

## 11. Styling

Global CSS is imported in `src/app/layout.js`:

```js
import "./globals.css"
```

Most styling is done with Tailwind utility classes directly in JSX.

Current design direction:

- Primary teal: `#005C72`
- Light app background: `#f1f4fa`
- Clean dashboard interface
- Minimal shadows
- Rounded components around `8px`
- Typography direction: Manrope, if added later

When adding UI, match the existing components first. For example, use `Card`, `Button`, `PageHeader`, and `StatCard` instead of restyling the same idea from scratch.

---

## 12. Auth Flow: Current and Future

Current state:

- `/login` has a form UI.
- `/register` has a form UI.
- There is not yet a connected auth state provider.
- `apiRequest` does not yet attach tokens.
- Dashboard routes are not yet protected.

Future state:

- Login sends credentials to Django.
- Django returns a token.
- The client stores the token.
- Protected API calls include the token.
- Dashboard pages redirect unauthenticated users to `/login`.

When implementing this, keep token storage and request headers centralized. Do not copy token logic into every page.

---

## 13. Current File Map

```txt
sentinel-matrix-client/
├── src/
│   ├── app/
│   │   ├── layout.js                 # Root layout, metadata, global CSS
│   │   ├── globals.css               # Global styles and Tailwind import
│   │   ├── page.js                   # /
│   │   ├── login/page.js             # /login
│   │   ├── register/page.js          # /register
│   │   ├── dashboard/page.js         # /dashboard
│   │   ├── courses/page.js           # /courses
│   │   ├── courses/[courseId]/page.js
│   │   ├── students/page.js          # /students
│   │   ├── students/[studentId]/page.js
│   │   └── analytics/page.js         # /analytics
│   │
│   ├── components/
│   │   ├── index.js                  # Barrel exports
│   │   ├── Layout.jsx                # App shell
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Container.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Table.jsx
│   │   ├── RiskBadge.jsx
│   │   └── other shared UI components
│   │
│   ├── lib/
│   │   ├── api.js                    # Shared fetch helper
│   │   ├── constants.js              # API URL and shared constants
│   │   └── index.js
│   │
│   └── dev-docs/
│       └── NEXTJS_Learning_GUIDE.md
│
├── public/
├── package.json
├── jsconfig.json
└── next.config.mjs
```

---

## 14. Debugging Checklist

When a frontend issue appears:

- What route am I on, and which `src/app/.../page.js` file owns it?
- Is this file a Server Component or Client Component?
- If it uses hooks, does it start with `"use client"`?
- Is the shared app shell needed? If so, is the page wrapped in `<Layout>`?
- Is the component imported from `@/components` correctly?
- Is the API request using `API_BASE_URL` from `src/lib/constants.js`?
- Is the Django backend running on `localhost:8000`?
- Does the Network tab show the request URL and response you expected?
- Does the backend response shape match what the frontend is rendering?
- Is the page currently hardcoded placeholder UI that still needs API integration?

---

## 15. Commands

Common frontend commands:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Use `npm run dev` while building locally. The frontend usually runs at:

```txt
http://localhost:3000
```

The Django backend usually runs at:

```txt
http://localhost:8000
```

---

## Final Mental Model

React helps you build the components.

Next.js gives those components routes, layouts, and app structure.

In this repo:

- `src/app` controls URLs.
- `page.js` files are route screens.
- `src/app/layout.js` is the required root layout.
- `src/components/Layout.jsx` is the Sentinel Matrix visual shell.
- `src/components` holds reusable UI.
- `src/lib/api.js` is where frontend-to-Django communication should be centralized.
- `src/lib/constants.js` stores shared values like the API base URL and risk bands.

If you can trace a feature from route to page to component to API helper to Django endpoint, you have the map.
