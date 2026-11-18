// Counting ticks breaks when the tab is in the background.
// Browsers throttle setInterval (often to once per second, or slower).
function start() {
  timerId = setInterval(() => {
    remaining -= 250; // assumes this really runs every 250 ms
    render();
    if (remaining <= 0) finish();
  }, 250);
}
// After 10 real minutes in a sleeping tab, the clock has barely moved.
