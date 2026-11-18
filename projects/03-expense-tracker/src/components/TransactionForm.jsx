import { useState } from "react";
import { CATEGORIES, today } from "../utils.js";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [date, setDate] = useState(today());
  const [error, setError] = useState("");

  function changeType(newType) {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  }

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
      amount: value,
      category,
      date,
    });
    setDescription("");
    setAmount("");
    setError("");
  }

  const activeTab = type === "expense" ? "bg-red-500 text-white" : "bg-emerald-500 text-white";
  const tab = (t) =>
    `flex-1 rounded-lg py-2 font-semibold ${type === t ? activeTab : "bg-slate-100 text-slate-600"}`;

  return (
    <form
      id="tx-form"
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Add a transaction</h2>
      <div className="flex gap-2">
        <button type="button" className={tab("expense")} onClick={() => changeType("expense")}>
          Expense
        </button>
        <button type="button" className={tab("income")} onClick={() => changeType("income")}>
          Income
        </button>
      </div>
      <input
        id="description"
        placeholder="Description, e.g. Groceries"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          id="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      >
        {CATEGORIES[type].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {error && (
        <p id="form-error" className="text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
      <button className="w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-700">
        Add
      </button>
    </form>
  );
}
