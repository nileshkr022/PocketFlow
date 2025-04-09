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
    const netBalance = {};

    transactions.forEach(({ from, to, amount }) => {
      netBalance[from] = (netBalance[from] || 0) - amount;
      netBalance[to] = (netBalance[to] || 0) + amount;
    });

    const creditors = [], debtors = [];

    for (let person in netBalance) {
      const bal = netBalance[person];
      if (bal > 0) creditors.push({ person, amount: bal });
      else if (bal < 0) debtors.push({ person, amount: -bal });
    }

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    const result = [];

    while (creditors.length && debtors.length) {
      const creditor = creditors[0];
      const debtor = debtors[0];
      const minAmount = Math.min(creditor.amount, debtor.amount);

      result.push({ from: debtor.person, to: creditor.person, amount: minAmount });

      creditor.amount -= minAmount;
      debtor.amount -= minAmount;

      if (creditor.amount === 0) creditors.shift();
      else creditors.sort((a, b) => b.amount - a.amount);

      if (debtor.amount === 0) debtors.shift();
      else debtors.sort((a, b) => b.amount - a.amount);
    }

    return result;
  };

  const minimizedTransactions = minimizeCashFlow(transactions);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)", 20, 20);
    doc.setFontSize(12);
    doc.text("Repayment Summary", 20, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Unoptimized Transactions"]],
      body: [],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 2,
      head: [["From", "To", "Amount"]],
      body: transactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Optimized Settlements"]],
      body: [],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 2,
      head: [["From", "To", "Amount"]],
      body: minimizedTransactions.map((t) => [t.from, t.to, `₹${t.amount}`]),
    });

    const timestamp = new Date().toLocaleString();
    doc.text(`Generated on: ${timestamp}`, 20, doc.lastAutoTable.finalY + 10);

    doc.save("pocketflow.pdf");
  };

  const csvData = [
    { Section: "Unoptimized Transactions" },
    ...transactions.map((t) => ({ From: t.from, To: t.to, Amount: `₹${t.amount}` })),
    {},
    { Section: "Optimized Settlements" },
    ...minimizedTransactions.map((t) => ({ From: t.from, To: t.to, Amount: `₹${t.amount}` })),
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-1">PocketFlow - Cash Flow Minimizer</h1>
      <p className="text-sm text-gray-600 mb-6">(by Nilesh Kumar)</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
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
