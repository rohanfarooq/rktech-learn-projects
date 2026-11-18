// From the calculator in projects/01-calculator
// Buttons say what they do:
//   <button data-action="digit" data-value="7">7</button>
//   <button data-action="operator" data-value="+">+</button>
//   <button data-action="equals">=</button>

// One listener on the parent
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
