// From the expense tracker in projects/03-expense-tracker/src/components/SpendingChart.jsx

// Step 1: add up each category
const totals = {};
for (const t of transactions) {
  if (t.type === "expense") {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  }
}

// Step 2: object to array
const data = Object.entries(totals).map(([name, value]) => ({
  name,
  value,
  fill: COLORS[name],
}));
