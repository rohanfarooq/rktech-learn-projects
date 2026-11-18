# Weather API Says 61, Not Rain? Turn Weather Codes Into Icons #Shorts

**Video:** [Weather API Says 61, Not Rain? Turn Weather Codes Into Icons #Shorts](https://youtu.be/y8jaIUQPaD4)  
**Goes live:** Fri Nov 13, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Weather App with JavaScript](../../projects/02-weather-app/)

## The bug

A weather code like `61` is a WMO number, not a sentence. Showing the raw number on the page looks like a bug.

See [`bug.js`](bug.js).

## The fix

`describe(code)` maps ranges of WMO codes to an icon name and a short label (61 falls in `code <= 67`, so `{ icon: "rain", text: "Rain" }`). `render()` uses that to pick `icons/rain.svg` and the caption.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
