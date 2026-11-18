// From the quiz app in projects/04-quiz-app/script.js
// Stop the old interval first.

function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_LIMIT;
  timerEl.textContent = timeLeft;
  timerEl.classList.remove("low");
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 5) timerEl.classList.add("low");
    if (timeLeft === 0) selectAnswer(-1);
  }, 1000);
}
