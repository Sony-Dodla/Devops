import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/dashboard");
        setData(res.data);
      } catch (e) {
        setErr("Failed to load dashboard");
      }
    })();
  }, []);

  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p><b>Total Balance:</b> {data.summary.totalBalance}</p>
      <p><b>Monthly Income:</b> {data.summary.monthlyIncome}</p>
      <p><b>Monthly Expense:</b> {data.summary.monthlyExpense}</p>
    </div>
  );
}