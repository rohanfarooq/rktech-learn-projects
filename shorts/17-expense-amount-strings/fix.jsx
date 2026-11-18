// From the expense tracker in
// projects/03-expense-tracker/src/components/TransactionForm.jsx
// Convert once, on submit, and reject anything that is not a number above 0.

function handleSubmit(e) {
  e.preventDefault();
  const value = Number(amount);
  if (description.trim() === "") {
    setError("Please add a description.");
    return;
  }
  if (!(value > 0)) {
    setError("Amount must be a number above 0.");
    return;
  }
  onAdd({
    id: crypto.randomUUID(),
    type,
    description: description.trim(),
    amount: value, // a real number, so 5 + 10 is 15
    category,
    date,
  });
}
