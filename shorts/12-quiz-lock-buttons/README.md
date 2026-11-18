# Click the Right Answer 5 Times = 5 Points? Lock Your Buttons in JavaScript #Shorts

**Video:** [Click the Right Answer 5 Times = 5 Points? Lock Your Buttons in JavaScript #Shorts](https://youtu.be/abo3H0iFsAc)  
**Goes live:** Sun Nov 15, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Quiz App with JavaScript](../../projects/04-quiz-app/)

## The bug

If the answer buttons stay enabled, a double-click (or a spam click) on the correct one adds a point each time. One question should only be worth one point.

See [`bug.js`](bug.js).

## The fix

`selectAnswer()` immediately sets `btn.disabled = true` on every answer, then colors the right and (if any) wrong choices. Disabled buttons cannot fire again. The timer is also cleared so it cannot score a second time.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
