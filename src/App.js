// src/App.js
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!from.trim() || !to.trim() || !amount || from === to) return;
    const newTx = { from: from.trim(), to: to.trim(), amount: parseFloat(amount) };
    setTransactions([...transactions, newTx]);
    setFrom("");
    setTo("");
    setAmount("");
  };

  const resetTransactions = () => {
    setTransactions([]);
  };

  const minimizeCashFlow = (transactions) => {
    const balanceMap = {};

    transactions.forEach(({ from, to, amount }) => {
      balanceMap[from] = (balanceMap[from] || 0) - amount;
      balanceMap[to] = (balanceMap[to] || 0) + amount;
    });

    const creditHeap = [], debitHeap = [];
    for (let person in balanceMap) {
      const bal = balanceMap[person];
      if (bal > 0) creditHeap.push({ person, amount: bal });
      else if (bal < 0) debitHeap.push({ person, amount: -bal });
    }

    creditHeap.sort((a, b) => b.amount - a.amount);
    debitHeap.sort((a, b) => b.amount - a.amount);

    const result = [];

    while (creditHeap.length && debitHeap.length) {
      const creditor = creditHeap[0];
      const debtor = debitHeap[0];
      const minAmount = Math.min(creditor.amount, debtor.amount);

      result.push({ from: debtor.person, to: creditor.person, amount: minAmount });

      creditor.amount -= minAmount;
      debtor.amount -= minAmount;

      if (creditor.amount === 0) creditHeap.shift();
      else creditHeap.sort((a, b) => b.amount - a.amount);

      if (debtor.amount === 0) debitHeap.shift();
      else debitHeap.sort((a, b) => b.amount - a.amount);
    }

    return result;
  };

  const minimizedTransactions = minimizeCashFlow(transactions);
  const currentDate = new Date().toLocaleDateString();

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)", 20, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${currentDate}`, 20, 28);

    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    doc.text("Repayment Summary", 20, 36);

    // Unoptimized Transactions Title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Unoptimized Transactions", 20, 46);
    autoTable(doc, {
      startY: 50,
      head: [["From", "To", "Amount"]],
      body: transactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
      theme: "striped",
      headStyles: { fillColor: [52, 152, 219] },
    });

    const nextY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Optimized Settlements", 20, nextY);
    autoTable(doc, {
      startY: nextY + 4,
      head: [["From", "To", "Amount"]],
      body: minimizedTransactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
      theme: "grid",
      headStyles: { fillColor: [46, 204, 113] },
    });

    doc.save("pocketflow.pdf");
  };

  const csvData = [
    ["PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)"],
    [`Date: ${currentDate}`],
    ["Repayment Summary"],
    [],
    ["Unoptimized Transactions"],
    ["From", "To", "Amount"],
    ...transactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
    [],
    ["Optimized Settlements"],
    ["From", "To", "Amount"],
    ...minimizedTransactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-1">
      💸 PocketFlow - Cash Flow Minimizer <span className="text-sm font-normal">(by Nilesh Kumar)</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
        <input
          className="p-2 border rounded"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addTransaction}
        >
          ➕ Add Transaction
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={resetTransactions}
        >
          🔄 Reset
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Unoptimized Transactions:</h2>
        <ul className="bg-white p-4 rounded shadow mb-4">
          {transactions.length ? (
            transactions.map((t, index) => (
              <li key={index}>
                {t.from} paid {t.to}: <strong>₹{t.amount}</strong>
              </li>
            ))
          ) : (
            <li>No transactions added yet.</li>
          )}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Optimized Settlements:</h2>
        <ul className="bg-white p-4 rounded shadow">
          {minimizedTransactions.length ? (
            minimizedTransactions.map((t, index) => (
              <li key={index}>
                {t.from} ➡️ {t.to}: <strong>₹{t.amount}</strong>
              </li>
            ))
          ) : (
            <li>No settlements calculated yet.</li>
          )}
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={exportPDF}
        >
          📄 Export PDF
        </button>
        <CSVLink
          filename="pocketflow.csv"
          data={csvData}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          📁 Export CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default App;