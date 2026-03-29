# Task Manager Frontend

A React frontend for the Task Manager REST API.

## Tech Stack
- React 18
- CSS Variables + custom styling
- Google Fonts (Syne + DM Sans)

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:3000`

## Environment Variables

Create a `.env.local` file to point to your API:

```
REACT_APP_API_URL=https://task-manager-api-production-e409.up.railway.app
```

## Deploying to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com and import the repo
3. Add environment variable `REACT_APP_API_URL` in Vercel settings
4. Deploy
