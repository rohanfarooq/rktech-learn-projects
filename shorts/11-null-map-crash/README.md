# API Sent null Instead of []? Stop the .map() Crash in React #Shorts

**Video:** [API Sent null Instead of []? Stop the .map() Crash in React #Shorts](https://youtu.be/wWIeH0Nx_9U)  
**Goes live:** Sat Nov 14, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Recipe Finder App in React](../../projects/05-recipe-finder/)

## The bug

TheMealDB returns `{ meals: null }` when a search has no hits, not `{ meals: [] }`. If you return `data.meals` and later call `.map()`, React crashes with `Cannot read properties of null`.

See [`bug.js`](bug.js).

## The fix

`return data.meals ?? []` turns `null` or `undefined` into an empty array. The UI can then show "No recipes found" instead of a blank crash. `getMeal` uses the same idea: `data.meals?.[0] ?? null`.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
