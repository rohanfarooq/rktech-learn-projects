const FOCUS_MINUTES = 25;
const BREAK_MINUTES = 5;

const timeEl = document.querySelector("#time");
const modeEl = document.querySelector("#mode");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const messageEl = document.querySelector("#message");
const sessionsEl = document.querySelector("#sessions");
const ring = document.querySelector("#ring-progress");

const CIRCUMFERENCE = 2 * Math.PI * 90; // the circle's r is 90
ring.style.strokeDasharray = CIRCUMFERENCE;

const bell = new Audio("bell.wav");

let mode = "focus"; // "focus" or "break"
let duration = FOCUS_MINUTES * 60 * 1000; // in milliseconds
let remaining = duration;
let endTime = 0;
let timerId = null;
let sessions = 0;

function format(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

function render() {
  const label = mode === "focus" ? "Focus" : "Break";
  timeEl.textContent = format(remaining);
  modeEl.textContent = label;
  document.title = `${format(remaining)} - ${label}`;
  document.body.classList.toggle("break", mode === "break");
  ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - remaining / duration);
  startBtn.textContent = timerId ? "Pause" : "Start";
  sessionsEl.textContent = sessions;
}

function tick() {
  remaining = Math.max(0, endTime - Date.now());
  render();
  if (remaining === 0) finish();
}

function start() {
  if (timerId) return; // already running
  endTime = Date.now() + remaining;
  timerId = setInterval(tick, 250);
  messageEl.textContent = "";
  render();
}

function pause() {
  clearInterval(timerId);
  timerId = null;
  remaining = Math.max(0, endTime - Date.now());
  render();
}

function reset() {
  clearInterval(timerId);
  timerId = null;
  remaining = duration;
  messageEl.textContent = "";
  render();
}

function setMode(newMode) {
  mode = newMode;
  const minutes = mode === "focus" ? FOCUS_MINUTES : BREAK_MINUTES;
  duration = minutes * 60 * 1000;
  remaining = duration;
}

function finish() {
  clearInterval(timerId);
  timerId = null;
  if (mode === "focus") sessions++;
  const message =
    mode === "focus"
      ? "Focus done! Take a 5-minute break."
      : "Break over! Ready to focus?";
  messageEl.textContent = message;
  bell.currentTime = 0;
  bell.play().catch(() => {}); // the browser may block sound
  notify(message);
  setMode(mode === "focus" ? "break" : "focus");
  render();
}

function notify(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pomodoro", { body: message });
  }
}

startBtn.addEventListener("click", () => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
  if (timerId) pause();
  else start();
});

resetBtn.addEventListener("click", reset);

render();
