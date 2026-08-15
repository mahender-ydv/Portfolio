# Mahender Yadav — Portfolio

A full-stack, animated portfolio website built with the MERN stack, showcasing
Mahender Yadav's experience and projects — including **EduHome** (a multi-tenant
online schooling & course marketplace), **TestPro**, and **Chatty**.

## Stack

**Frontend** — React 19 + Vite, Tailwind CSS v4, Framer Motion, Axios
**Backend** — Node.js, Express, MongoDB (Mongoose), express-validator, helmet, rate limiting

## Structure

```
portfolio/
├── frontend/     React app — the portfolio site itself
└── backend/      Express API — powers the contact form
```

## Design

- **Liquid-glass navbar** — a floating, frosted pill nav (iOS-style blur) that
  shrinks on scroll, highlights the active section with a sliding pill, and
  carries a resume-download button.
- **Live metrics dashboard hero** — the real production numbers from Mahender's
  resume (PageSpeed 55→90, API response time 800ms→150ms, etc.) animate in as
  a "monitoring dashboard" panel, tying the hero directly to real, provable work
  rather than generic hero copy. Headline reveals line-by-line on load.
- **Cinematic project cards** — tilt-on-hover glass cards for EduHome, TestPro,
  and Chatty, each with a live-demo link and GitHub link, with EduHome presented
  as the flagship/featured project.
- **Motion layer** — a scroll progress bar, an infinite tech-stack marquee,
  magnetic buttons that pull toward the cursor, and drifting ambient particles
  across a graphite-black base with teal/violet/amber accents.
- Space Grotesk (display), Inter (body), JetBrains Mono (stats/labels).

## Features

- **Resume download** — set `resumeUrl` in `frontend/src/data.js` to your
  Google Drive share link (**Anyone with the link → Viewer**). Buttons in the
  navbar, mobile menu, and hero link straight to it.
- **Contact form → email** — messages are saved to MongoDB *and* emailed to
  you via the backend's `/api/contact` route (see `backend/README.md` for SMTP
  setup). The submission still succeeds even if email isn't configured yet.
- **Live project + GitHub links** — each project in `data.js` has `liveUrl`
  and `githubUrl` fields; cards render a GitHub icon and a "Live demo" button
  that open in a new tab. (Links out rather than an embedded iframe, since most
  hosts block being framed by another site via `X-Frame-Options`.)


## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env     # then fill in MONGO_URI and ADMIN_KEY
npm install
npm run dev               # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # VITE_API_URL should point at your backend
npm install
npm run dev                # http://localhost:5173
```


## Editing your content

All resume content (experience, projects, skills, education) lives in one file:

frontend/src/data.js

Update your projects, metrics, or bio there — every section of the site reads
from this file, so there's no need to touch component code to update content.

**Before you deploy, update these placeholder values in `data.js`:**

- `profile.resumeUrl` — your real Google Drive resume link (share as "Anyone
  with the link → Viewer")
- `profile.github` / `profile.linkedin` — your real profile URLs
- Each project's `liveUrl` and `githubUrl` — your real deployed links and repos

## Deploying

- **Frontend**: deploy `frontend/` to Vercel, Netlify, or any static host. Set
  `VITE_API_URL` to your deployed backend URL in the host's environment settings.
- **Backend**: deploy `backend/` to Render, Railway, or a VPS. Set `MONGO_URI`
  (e.g. a MongoDB Atlas connection string), `CLIENT_ORIGIN` (your frontend's
  deployed URL, for CORS), and `ADMIN_KEY` (a long random string) as environment
  variables.

## Viewing contact messages

