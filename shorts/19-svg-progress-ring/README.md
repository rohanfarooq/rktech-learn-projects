# Countdown Ring That Empties as Time Runs Out? 2 SVG Circles + 1 Line of JS #Shorts

**Video:** [Countdown Ring That Empties as Time Runs Out? 2 SVG Circles + 1 Line of JS #Shorts](https://youtu.be/2--5H_onrf0)  
**Goes live:** Sun Nov 22, 2026, 5:00 PM PKT  
**Status:** Scheduled  
**From the full project:** [Build a Pomodoro Timer with JavaScript](../../projects/07-pomodoro-timer/)

## The bug

Setting `strokeDashoffset` on its own does nothing. Without `strokeDasharray` the stroke is one solid line, so there is no dash to shift and the ring stays full the whole time.

See [`bug.js`](bug.js).

## The fix

The ring is just two SVG circles with the same radius (`r="90"`): a grey track and the progress ring on top. JavaScript makes one dash as long as the whole circle, `ring.style.strokeDasharray = CIRCUMFERENCE` (`2 * Math.PI * 90`). Then every `render()` shifts it with `ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - remaining / duration)`: offset 0 is a full ring, the full circumference is an empty one.

See [`fix.html`](fix.html) and [`fix.js`](fix.js). The same code lives in the finished project above.

## Tested

We ran the real app in headless Chrome: 25:00 is a full ring, 12:30 is half (offset 283), 05:00 is a fifth (offset 452), and with the `strokeDasharray` line removed the ring never moves (9 of 9 checks passed).

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
