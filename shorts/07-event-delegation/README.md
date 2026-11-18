# 18 Buttons, 1 Event Listener: Event Delegation in JavaScript #Shorts

**Video:** [18 Buttons, 1 Event Listener: Event Delegation in JavaScript #Shorts](https://youtu.be/nfkqAgJoNFE)  
**Goes live:** Tue Nov 10, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Calculator with HTML, CSS & JavaScript](../../projects/01-calculator/)

## The bug

A click listener on every button works until you add another key, or you care about how many listeners you created. Eighteen buttons do not need eighteen handlers.

See [`bug.js`](bug.js).

## The fix

Each button has `data-action` and, where needed, `data-value`. One listener on `.keys` uses `closest("button")` and `button.dataset` to decide what to do. New buttons work automatically as long as they have the same attributes.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
