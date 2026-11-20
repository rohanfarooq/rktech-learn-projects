// From the pomodoro timer in projects/07-pomodoro-timer/script.js
// 1. Make one dash exactly as long as the whole circle.
const ring = document.querySelector("#ring-progress");
const CIRCUMFERENCE = 2 * Math.PI * 90; // the circle's r is 90
ring.style.strokeDasharray = CIRCUMFERENCE;

// 2. Every render, shift that dash by the share of time that's gone.
//    offset 0 = full ring, offset CIRCUMFERENCE = empty ring.
function render() {
  // ...
  ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - remaining / duration);
  // ...
}
