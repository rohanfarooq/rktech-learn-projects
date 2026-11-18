// Don't do this. eval() runs whatever text it gets, not just math.
const answer = eval("7+5"); // 12 — looks fine
const danger = eval(anyText); // runs ANY JavaScript

// Also, the screen holds text, so + will join strings:
"7" + "5"; // "75", not 12
