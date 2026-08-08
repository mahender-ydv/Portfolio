# Portfolio Backend

Express + MongoDB API that powers the contact form on the portfolio frontend.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable        | Description                                                              |
|-----------------|---------------------------------------------------------------------------|
| `PORT`          | Port the server listens on (default `5000`)                              |
| `MONGO_URI`     | MongoDB connection string (e.g. from MongoDB Atlas)                      |
| `CLIENT_ORIGIN` | The frontend's origin, for CORS (comma-separate multiple origins)        |
| `ADMIN_KEY`     | A long random secret used to protect `GET /api/contact`                  |
| `EMAIL_HOST`    | SMTP host (default `smtp.gmail.com`)                                     |
| `EMAIL_PORT`    | SMTP port (`587` for STARTTLS, `465` for SSL)                            |
| `EMAIL_SECURE`  | `true` for port 465, `false` for 587                                     |
| `EMAIL_USER`    | The email address that sends notifications                               |
| `EMAIL_PASS`    | App password for that account (see below)                                |
| `EMAIL_TO`      | Where owner notifications land (defaults to `EMAIL_USER`)                |

### Setting up Gmail to send contact-form emails

1. Turn on 2-Step Verification on the Google account at
   https://myaccount.google.com/security
2. Create an App Password at https://myaccount.google.com/apppasswords
   (choose "Mail" as the app).
3. Use that 16-character password as `EMAIL_PASS` — never your normal Gmail
   password.

If `EMAIL_USER`/`EMAIL_PASS` aren't set, the contact form still works and
messages are still saved to MongoDB — the server just skips sending email and
logs a warning, so nothing breaks in development before you configure it.

## Run

```bash
npm run dev     # nodemon, auto-restarts on changes
npm start        # plain node
```

## Endpoints

| Method | Path            | Auth              | Description                          |
|--------|-----------------|-------------------|---------------------------------------|
| GET    | `/api/health`   | none              | Health check                          |
| POST   | `/api/contact`  | none (rate-limited) | Submit a contact form message       |
| GET    | `/api/contact`  | `x-admin-key` header | List the 200 most recent messages |

`POST /api/contact` is rate-limited to 5 requests per 15 minutes per IP, and
validates `name`, `email`, and `message` server-side before writing to MongoDB.

## Project layout

```
src/
├── app.js              Express app (routes, middleware) — no side effects
├── server.js           Bootstraps DB connection + starts the HTTP server
├── config/db.js         Mongoose connection
├── models/Contact.js    Contact message schema
├── middleware/adminAuth.js   Protects the admin-only GET route
└── routes/contact.js    Contact form routes
```

`app.js` is separated from `server.js` so the Express app can be constructed
and tested independently of an actual MongoDB connection.
