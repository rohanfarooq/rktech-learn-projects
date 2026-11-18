// Where it goes wrong: the buttons stay clickable after you answer.
function selectAnswer(choice) {
  const q = questions[current];
  if (choice === q.correct) {
    score++;
    scoreEl.textContent = score;
  }
}
// Spam-click the right answer and the score jumps 5 points for one question.
