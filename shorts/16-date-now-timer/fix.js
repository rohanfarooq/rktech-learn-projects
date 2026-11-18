// From the pomodoro timer in projects/07-pomodoro-timer/script.js
// Save the end time, then read the real clock on every tick.

function start() {
  if (timerId) return; // already running
  endTime = Date.now() + remaining;
  timerId = setInterval(tick, 250);
  messageEl.textContent = "";
  render();
}

function tick() {
  remaining = Math.max(0, endTime - Date.now());
  render();
  if (remaining === 0) finish();
}
