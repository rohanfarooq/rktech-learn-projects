# 3 Columns on a Laptop, 1 on a Phone, No Media Queries? CSS Grid auto-fit #Shorts

**Video:** [3 Columns on a Laptop, 1 on a Phone, No Media Queries? CSS Grid auto-fit #Shorts](https://youtu.be/0odcN5cwhyk)  
**Goes live:** Mon Nov 16, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Personal Portfolio Website](../../projects/06-portfolio/)

## The bug

`grid-template-columns: 1fr 1fr 1fr` is always three columns, even on a 320 px phone. You can patch it with a media query, but you will keep tweaking breakpoints as you add layouts.

See [`bug.css`](bug.css).

## The fix

`repeat(auto-fit, minmax(240px, 1fr))` means: make columns that are at least 240 px, as many as fit, and let them grow equally. No media query is required for this grid.

See [`fix.css`](fix.css). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
