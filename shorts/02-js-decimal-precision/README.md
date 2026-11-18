# Why 0.1 + 0.2 Isn't 0.3 in JavaScript (and How to Fix It) #Shorts

**Video:** [Why 0.1 + 0.2 Isn't 0.3 in JavaScript (and How to Fix It) #Shorts](https://youtu.be/bC6kvbLZfl0)  
**Goes live:** Thu Nov 5, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Calculator with HTML, CSS & JavaScript](../../projects/01-calculator/)

## The bug

`0.1 + 0.2` is `0.30000000000000004` in JavaScript. That is a binary floating-point rounding error, not a bug in your `+` sign. A calculator that prints it as-is looks broken.

See [`bug.js`](bug.js).

## The fix

`format(n)` runs `n.toPrecision(12)`, then `parseFloat` to drop extra zeros, then `String` so the display can show it. `0.1 + 0.2` becomes `"0.3"`, and whole numbers like `12` stay `"12"`.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
