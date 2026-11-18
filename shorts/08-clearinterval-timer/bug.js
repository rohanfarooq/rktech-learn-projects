// Where it goes wrong: startTimer() is called for every new question,
// but the old setInterval keeps running.
function startTimer() {
  timeLeft = TIME_LIMIT;
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) selectAnswer(-1);
  }, 1000);
}
// Click Next twice, and two intervals tick the same timeLeft.
