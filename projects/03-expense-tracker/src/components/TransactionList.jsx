import { formatMoney } from "../utils.js";

export default function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return (
      <p id="empty" className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
        No transactions yet. Add your first one above!
      </p>
    );
  }

  return (
    <ul id="tx-list" className="divide-y divide-slate-100 rounded-2xl bg-white shadow-sm">
      {sorted.map((t) => (
        <li key={t.id} className="flex items-center gap-4 px-6 py-3">
          <div className="flex-1">
            <p className="font-semibold">{t.description}</p>
            <p className="text-sm text-slate-500">
              {t.category} • {t.date}
            </p>
          </div>
          <p className={`font-bold ${t.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
            {t.type === "income" ? "+" : "-"}
            {formatMoney(t.amount)}
          </p>
          <button
            onClick={() => onDelete(t.id)}
            aria-label={`Delete ${t.description}`}
            className="rounded-lg px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
