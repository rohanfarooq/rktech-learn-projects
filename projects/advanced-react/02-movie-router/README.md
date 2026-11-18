# Build This Multi-Page Movie App with React Router (Search, Details & 404) | Beginner Project

**Video:** [Build This Multi-Page Movie App with React Router (Search, Details & 404) | Beginner Project](https://youtu.be/DzV4gMjmrFI)  
**Goes live:** Mon Nov 23, 2026, 7:00 PM PKT  
**Status:** Scheduled

![Video thumbnail](docs/thumbnail.png)

## What you build

MovieShelf is a multi-page app: a home list of Studio Ghibli films, a search page whose query lives in the URL, a details page at `/movie/:id`, and a custom 404. A shared layout wraps every page. `vercel.json` rewrites all paths to `index.html` so client-side routes work after a deploy.

## Tech

React 19, Vite 8, React Router 8, the free Studio Ghibli API (no key)

## How to run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173). You need an internet connection. Films are loaded from `https://ghibliapi.vercel.app`; no API key is required.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Build steps (same order as the video)

1. **What we're building.** Home, search, movie details, and a 404 page, all sharing one layout and one router.
2. **Create the app.** A Vite + React app with `react-router` in `package.json`.
3. **Turn on the router.** `main.jsx` wraps the tree in `<BrowserRouter>`.
4. **The list of routes.** `App.jsx` declares nested `<Routes>`: index (home), `search`, `movie/:id`, and `*` for not found, all under a layout route.
5. **The layout.** `Layout.jsx` is the shell (nav + `<Outlet />`) so the header stays on every page.
6. **Fetch the movies.** `src/api.js` calls the Studio Ghibli API. `getMovies()` lists films; `getMovie(id)` returns `null` on a 404.
7. **Home page + Link.** `Home.jsx` loads the list and links each card to `/movie/:id` with React Router's `Link`.
8. **Search in the URL.** `Search.jsx` reads and writes the query string (`?q=`) so a search is shareable and survives a refresh.
9. **The details page.** `MovieDetails.jsx` reads `:id` with `useParams` and loads that film.
10. **The 404 page.** `NotFound.jsx` is rendered by the `*` route when no other path matches.
11. **Test it.** Browse from home to a film, search, open a bad id, and hit an unknown URL.
12. **Deploy on Vercel.** `vercel.json` rewrites every path to `index.html` so a direct visit to `/movie/123` does not 404 on the server. Build with `npm run build` and deploy.

## Channel

This project is from [RKTech Learn](https://www.youtube.com/@rktech_learn), a YouTube channel that teaches coding to complete beginners.
