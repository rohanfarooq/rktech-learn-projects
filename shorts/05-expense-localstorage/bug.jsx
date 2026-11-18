import { useState } from "react";

// useState([]) always starts empty, so a refresh wipes the list.
export default function App() {
  const [transactions, setTransactions] = useState([]);
  // ...
}
