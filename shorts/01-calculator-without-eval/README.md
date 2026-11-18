# Build a Calculator Without eval() in JavaScript (Beginner Tip) #Shorts

**Video:** [Build a Calculator Without eval() in JavaScript (Beginner Tip) #Shorts](https://youtu.be/LpIDjyw_kDg)  
**Goes live:** Wed Nov 4, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Calculator with HTML, CSS & JavaScript](../../projects/01-calculator/)

## The bug

`eval("7+5")` happens to return 12, but `eval` will also run any other JavaScript it is given, which is risky and hard to debug. And if you add the screen's text with `+` (`"7" + "5"`), you get `"75"` instead of 12.

See [`bug.js`](bug.js).

## The fix

`calculate(a, b, op)` does one of the four sums and returns `null` when you divide by zero. `evaluate()` runs `parseFloat(current)` first so the values are numbers, then shows `Error` when the result is `null`.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
