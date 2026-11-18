# API Sends 20 Ingredient Fields, 12 Empty? Loop Them Into a Clean List #Shorts

**Video:** [API Sends 20 Ingredient Fields, 12 Empty? Loop Them Into a Clean List #Shorts](https://youtu.be/_ptarYOEuuQ)  
**Goes live:** Wed Nov 18, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Recipe Finder App in React](../../projects/05-recipe-finder/)

## The bug

TheMealDB does not send an ingredients array. It sends `strIngredient1`…`strIngredient20` and matching `strMeasure*` fields, many of them empty. Hard-coding 20 lines of JSX is brittle and leaves blank list items.

See [`bug.js`](bug.js).

## The fix

`getIngredients(meal)` loops `1` to `20`, reads `meal["strIngredient" + i]`, skips blanks, and returns `{ name, measure }` objects. The details page just maps that clean list.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
