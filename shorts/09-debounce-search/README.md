# Typing Sends 7 API Requests? Debounce Your React Search #Shorts

**Video:** [Typing Sends 7 API Requests? Debounce Your React Search #Shorts](https://youtu.be/vsqoeoh5hPc)  
**Goes live:** Thu Nov 12, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Recipe Finder App in React](../../projects/05-recipe-finder/)

## The bug

If `useEffect` depends on the raw search input, every keystroke hits the API. Typing "chicken" can send seven requests, and slower responses may arrive out of order.

See [`bug.jsx`](bug.jsx).

## The fix

`useDebounce(value, 500)` only updates after 500 ms of quiet (the cleanup clears the last timeout). The effect depends on `debouncedQuery` and uses an `AbortController` so a stale request is cancelled. "chicken" sends one request.

See [`fix.jsx`](fix.jsx). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
