# React Data Gone After Refresh? Save It With localStorage #Shorts

**Video:** [React Data Gone After Refresh? Save It With localStorage #Shorts](https://youtu.be/5moaG2kewLk)  
**Goes live:** Sun Nov 8, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build an Expense Tracker in React](../../projects/03-expense-tracker/)

## The bug

`useState([])` starts the list empty on every mount. A refresh looks like the user's data has disappeared, even though they just added it.

See [`bug.jsx`](bug.jsx).

## The fix

`loadTransactions()` reads JSON from `localStorage` (or `[]` if nothing is saved, or if the JSON is bad). `useState(loadTransactions)` uses that as the initial state, and a `useEffect` writes the list back whenever it changes.

See [`fix.jsx`](fix.jsx). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
