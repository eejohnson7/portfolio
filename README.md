# Erin Johnson Portfolio

A React and Vite portfolio backed by Supabase content.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide the required values.
3. Start the app with `npm run dev`.

Required environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_RESUME_URL`

## Database and deployment

Apply pending files in `supabase/migrations` before deploying frontend code that reads their new tables or columns. The homepage content migration creates public, read-only content tables with row-level security and explicit `anon`/`authenticated` select grants.

Before merging or deploying, run:

```sh
npm run lint
npm run build
```

There is currently no automated test script in `package.json`, so the main routes should also receive a local browser smoke test.
