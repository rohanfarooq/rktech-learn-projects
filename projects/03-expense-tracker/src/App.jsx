import { useEffect, useState } from "react";
import Summary from "./components/Summary.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import SpendingChart from "./components/SpendingChart.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { monthLabel } from "./utils.js";

const STORAGE_KEY = "expense-tracker-transactions";

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [month, setMonth] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(transaction) {
    setTransactions([transaction, ...transactions]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))]
    .sort()
    .reverse();
  const activeMonth = months.includes(month) ? month : "all";
  const shown =
    activeMonth === "all"
      ? transactions
      : transactions.filter((t) => t.date.startsWith(activeMonth));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <select
            id="month"
            value={activeMonth}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2"
          >
            <option value="all">All months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </header>

        <Summary transactions={shown} />

        <div className="grid gap-6 md:grid-cols-2">
          <TransactionForm onAdd={addTransaction} />
          <SpendingChart transactions={shown} />
        </div>

        <TransactionList transactions={shown} onDelete={deleteTransaction} />
      </div>
    </main>
  );
}
