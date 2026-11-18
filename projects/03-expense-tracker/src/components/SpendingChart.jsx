import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS, formatMoney } from "../utils.js";

export default function SpendingChart({ transactions }) {
  const totals = {};
  for (const t of transactions) {
    if (t.type === "expense") {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    }
  }
  const data = Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    fill: COLORS[name],
  }));

  return (
    <section id="chart" className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Spending by category</h2>
      {data.length === 0 ? (
        <p className="py-24 text-center text-slate-500">No expenses to show yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} />
            <Tooltip formatter={(value) => formatMoney(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
