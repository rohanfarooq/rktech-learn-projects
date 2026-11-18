import { formatMoney } from "../utils.js";

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Balance</p>
        <p
          id="balance"
          className={`text-3xl font-bold ${balance < 0 ? "text-red-600" : "text-slate-900"}`}
        >
          {formatMoney(balance)}
        </p>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Income</p>
        <p id="income" className="text-3xl font-bold text-emerald-600">
          {formatMoney(income)}
        </p>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Expenses</p>
        <p id="expenses" className="text-3xl font-bold text-red-600">
          {formatMoney(expenses)}
        </p>
      </div>
    </section>
  );
}
