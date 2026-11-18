# Your JavaScript Timer Runs Too Fast? Use clearInterval First #Shorts

**Video:** [Your JavaScript Timer Runs Too Fast? Use clearInterval First #Shorts](https://youtu.be/SEnN-LAo70Y)  
**Goes live:** Wed Nov 11, 2026, 5:00 PM PKT  
**Status:** Live  
**From the full project:** [Build a Quiz App with JavaScript](../../projects/04-quiz-app/)

## The bug

Every call to `setInterval` starts a new timer. If `startTimer()` does not cancel the previous one, old intervals keep subtracting from `timeLeft` and the countdown races (15, 13, 10…).

See [`bug.js`](bug.js).

## The fix

Call `clearInterval(timerId)` at the top of `startTimer()`. It is safe even when `timerId` is still `null`. Then start the new interval. The quiz also clears the timer in `selectAnswer()` when you pick an answer.

See [`fix.js`](fix.js). The same code lives in the finished project above.

## How to read these files

These are the small examples from the Short, not a standalone app. Open the full project folder to run the working version.
