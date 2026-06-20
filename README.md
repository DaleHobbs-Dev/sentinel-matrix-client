# Sentinel Matrix Client

Sentinel Matrix is a student-risk dashboard for instructors. The goal is to help instructors manage courses, students, enrollments, assessments, and risk indicators from one focused interface.

This repository is the **Vite + React client** for the project. It consumes the Django REST Framework API in the related backend repository.

---

## Tech Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

---

## Related Repository

| Repo | Description |
| --- | --- |
| [Sentinel Matrix API](https://github.com/DaleHobbs-Dev/sentinel-matrix-server) | Django REST Framework backend |

---

## Current Project Structure

```txt
sentinel-matrix-client/
├── archived-next-client/       # Ignored archive of the first Next.js version
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Imported images and frontend assets
│   ├── dev-docs/
│   │   └── ERD.dbml            # Database model planning document
│   ├── routes/
│   │   ├── AppRoutes.jsx       # React Router route definitions
│   │   └── Authorized.jsx      # Protected-route wrapper
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── index.css
│   └── main.jsx                # Vite/React entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

Planned folders as the MVP grows:

```txt
src/
├── components/
│   ├── ui/
│   └── layout/
├── contexts/
├── pages/
├── services/
└── utils/
```

---

## Documentation

Project documentation currently lives in [`src/dev-docs/`](src/dev-docs/):

| File | Description |
| --- | --- |
| [ERD.dbml](src/dev-docs/ERD.dbml) | Database schema planning for instructors, courses, students, enrollments, assessments, and risk data |

The previous Next.js client has been archived locally under `archived-next-client/` and is ignored by Git. It is kept only as a reference while the active frontend is rebuilt with Vite.

---

## MVP Goals

The planned MVP focuses on instructor workflows:

- **Authentication** — register, log in, store auth state, and protect dashboard routes
- **Courses** — create and manage instructor-owned courses
- **Students** — add and manage students
- **Enrollments** — connect students to courses
- **Assessments** — record assessment data for enrolled students
- **Risk Scoring** — display calculated student risk scores and risk bands
- **Dashboard** — summarize course, student, and at-risk student information

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The [Sentinel Matrix API](https://github.com/DaleHobbs-Dev/sentinel-matrix-server) running locally on port `8000`

### Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:DaleHobbs-Dev/sentinel-matrix-client.git
   cd sentinel-matrix-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local Vite URL shown in the terminal. By default, this is usually:

   ```txt
   http://localhost:5173
   ```

The client expects the Django API to be available at:

```txt
http://localhost:8000
```

If the API URL needs to be configured later, use a Vite environment variable:

```txt
VITE_API_BASE_URL=http://localhost:8000
```

---

## Available Scripts

```bash
npm run dev      # Start the Vite dev server
npm run build    # Build the production client
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## Development Notes

- This project now uses Vite, not Next.js.
- Active route work should live in `src/routes/`.
- Route-level screens should eventually live in `src/pages/`.
- Reusable UI should eventually live in `src/components/`, with generic controls in `src/components/ui/`.
- API calls should eventually be centralized in `src/services/`.
- `archived-next-client/` is ignored and should not be used as the active app.

---

## Contributor

| Name | GitHub |
| --- | --- |
| Dale Hobbs | [@DaleHobbs-Dev](https://github.com/DaleHobbs-Dev) |
