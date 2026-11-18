// From the quiz app in projects/04-quiz-app/script.js
// Lock every answer as soon as one is chosen (or time runs out).

function selectAnswer(choice) {
  clearInterval(timerId);
  const q = questions[current];
  answersEl.querySelectorAll(".answer").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === choice) btn.classList.add("wrong");
  });
  if (choice === q.correct) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct!";
  } else if (choice === -1) {
    feedbackEl.textContent = "Time's up!";
  } else {
    feedbackEl.textContent = "Not quite.";
  }
  const last = current === questions.length - 1;
  nextBtn.textContent = last ? "See results" : "Next";
  nextBtn.hidden = false;
}
