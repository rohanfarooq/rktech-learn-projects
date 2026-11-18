// From the calculator in projects/01-calculator/script.js
// One function, four operators. No eval().

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? null : a / b;
}

function evaluate() {
  if (!operator || resetNext) return;
  // parseFloat turns the screen text into a real number first
  const result = calculate(previous, parseFloat(current), operator);
  current = result === null ? "Error" : format(result);
  previous = null;
  operator = null;
  resetNext = true;
}
