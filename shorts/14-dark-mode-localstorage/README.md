# Dark Mode Resets on Refresh? Save It With localStorage (JavaScript) #Shorts

**Video:** [Dark Mode Resets on Refresh? Save It With localStorage (JavaScript) #Shorts](https://youtu.be/YlPFMk9Wunk)  
**Goes live:** Tue Nov 17, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Personal Portfolio Website](../../projects/06-portfolio/)

## The bug

Toggling a `.dark` class works until the user refreshes. The class is gone, so the site jumps back to light mode and it feels like the toggle is broken.

See [`bug.js`](bug.js).

## The fix

`setTheme(theme)` updates the class, the button label, and `localStorage`. On load, `setTheme(localStorage.getItem("theme") || "light")` restores the last choice.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
