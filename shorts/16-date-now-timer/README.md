# Timer Falls Behind in a Background Tab? Use Date.now(), Not Ticks (JavaScript) #Shorts

**Video:** [Timer Falls Behind in a Background Tab? Use Date.now(), Not Ticks (JavaScript) #Shorts](https://youtu.be/rfIThTBPhPM)  
**Goes live:** Thu Nov 19, 2026, 5:00 PM PKT  
**Status:** Scheduled  
**From the full project:** [Build a Pomodoro Timer with JavaScript](../../projects/07-pomodoro-timer/)

## The bug

Subtracting a fixed step on each interval assumes the callback really runs on time. Background tabs are throttled, so a tick-based Pomodoro can show 24:58 after ten real minutes.

See [`bug.js`](bug.js).

## The fix

`start()` stores `endTime = Date.now() + remaining`. `tick()` sets `remaining = Math.max(0, endTime - Date.now())`. Even if the interval runs late, the clock still matches wall time.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
