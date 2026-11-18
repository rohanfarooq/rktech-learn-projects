// From the calculator in projects/01-calculator/script.js
// Round every answer to 12 significant digits, then drop leftover zeros.

function format(n) {
  return String(parseFloat(n.toPrecision(12)));
}

format(0.1 + 0.2); // "0.3"
format(1 / 3);     // "0.333333333333"
format(12);        // "12"
