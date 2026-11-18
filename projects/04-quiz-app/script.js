const TIME_LIMIT = 15;

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const endScreen = document.querySelector("#end-screen");
const progressEl = document.querySelector("#progress");
const timerEl = document.querySelector("#timer");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const nextBtn = document.querySelector("#next-btn");
const finalEl = document.querySelector("#final");
const bestMsgEl = document.querySelector("#best-msg");
const highScoreEl = document.querySelector("#high-score");

let current = 0;
let score = 0;
let timeLeft = TIME_LIMIT;
let timerId = null;
let highScore = Number(localStorage.getItem("quizHighScore")) || 0;
highScoreEl.textContent = highScore;

function showScreen(screen) {
  for (const s of [startScreen, quizScreen, endScreen]) {
    s.hidden = s !== screen;
  }
}

function startQuiz() {
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(i));
    answersEl.append(btn);
  });
  nextBtn.hidden = true;
  startTimer();
}

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

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) showQuestion();
  else endQuiz();
});

function endQuiz() {
  showScreen(endScreen);
  finalEl.textContent = `You scored ${score} out of ${questions.length}`;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("quizHighScore", highScore);
    bestMsgEl.textContent = "New high score!";
  } else {
    bestMsgEl.textContent = `High score to beat: ${highScore}`;
  }
  highScoreEl.textContent = highScore;
}

document.querySelector("#start-btn").addEventListener("click", startQuiz);
document.querySelector("#again-btn").addEventListener("click", startQuiz);
