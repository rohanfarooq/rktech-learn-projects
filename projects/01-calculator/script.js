const display = document.querySelector("#display");
const historyLine = document.querySelector("#history");
const keys = document.querySelector(".keys");

let current = "0";      // the number being typed
let previous = null;    // the first number
let operator = null;    // "+", "-", "*" or "/"
let resetNext = false;  // start a new number on the next digit?

const SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function update() {
  display.textContent = current;
  display.classList.toggle("small", current.length > 9);
  historyLine.textContent = operator ? `${previous} ${SYMBOLS[operator]}` : "";
}

function inputDigit(digit) {
  if (resetNext || current === "0") {
    current = digit;
    resetNext = false;
  } else if (current.length < 12) {
    current += digit;
  }
}

function inputDecimal() {
  if (resetNext) {
    current = "0.";
    resetNext = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? null : a / b;
}

function format(n) {
  return String(parseFloat(n.toPrecision(12)));
}

function chooseOperator(op) {
  if (current === "Error") return;
  if (operator && !resetNext) evaluate();
  if (current === "Error") return;
  previous = parseFloat(current);
  operator = op;
  resetNext = true;
}

function evaluate() {
  if (!operator || resetNext) return;
  const result = calculate(previous, parseFloat(current), operator);
  current = result === null ? "Error" : format(result);
  previous = null;
  operator = null;
  resetNext = true;
}

function deleteLast() {
  if (resetNext) return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  resetNext = false;
}

keys.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  const { action, value } = button.dataset;
  if (action === "digit") inputDigit(value);
  if (action === "decimal") inputDecimal();
  if (action === "operator") chooseOperator(value);
  if (action === "equals") evaluate();
  if (action === "delete") deleteLast();
  if (action === "clear") clearAll();
  update();
});

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
  else if (e.key === ".") inputDecimal();
  else if (e.key in SYMBOLS) chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    evaluate();
  }
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearAll();
  else return;
  update();
});
