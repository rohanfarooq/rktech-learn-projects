// Recharts wants an array like [{ name: "Food", value: 30 }, ...].
// Passing the raw transaction list does not group anything:
<Pie data={transactions} dataKey="amount" nameKey="category" />
// Two "Food" rows stay two slices, and income is mixed in with expenses.
