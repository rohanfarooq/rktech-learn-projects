// From the expense tracker in projects/03-expense-tracker/src/App.jsx

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
  // Pass the function, not loadTransactions(), so it only runs on the first render
  const [transactions, setTransactions] = useState(loadTransactions);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);
  // ...
}
