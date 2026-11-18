export const CATEGORIES = {
  expense: ["Food", "Transport", "Rent", "Bills", "Shopping", "Fun", "Other"],
  income: ["Salary", "Freelance", "Gift", "Other"],
};

export const COLORS = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Rent: "#8b5cf6",
  Bills: "#ef4444",
  Shopping: "#ec4899",
  Fun: "#10b981",
  Other: "#64748b",
};

export function formatMoney(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// "2026-11" -> "November 2026"
export function monthLabel(key) {
  const [year, month] = key.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// today's date as "YYYY-MM-DD" (the format of <input type="date">)
export function today() {
  return new Date().toLocaleDateString("en-CA");
}
