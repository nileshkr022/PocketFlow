# 💸 PocketFlow - Cash Flow Minimizer

**PocketFlow** is a React-based tool that simplifies debt settlement among groups. It calculates optimized repayments that reduce the number of transactions needed to settle all balances.

---

## 🔧 Features

- ✅ Add unoptimized transactions (who paid whom and how much)
- 🔁 Calculates optimized settlements with minimal transactions
- 📄 Export both unoptimized and optimized transactions to **PDF**
- 📁 Export both tables to **CSV**
- 🧼 Clean UI with TailwindCSS
- 🔄 Reset transactions instantly

---

## 📁 Project Structure


PocketFlow/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── App.js                  # Core logic + UI components
│   ├── index.js                # React DOM entry point
│   └── styles.css              # Optional Tailwind or global styles
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind configuration (if used)
└── README.md                   # This documentation
🚀 Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/pocketflow.git
cd pocketflow
2. Install Dependencies
npm install
3. Run the App
npm start
📘 How to Use
➕ Add Transactions
Input who paid whom and how much.

Example:

Alice paid Bob ₹1000

Bob paid Charlie ₹2000

⚡ Optimized Settlements
The app calculates a minimal set of repayments.
For example:

Alice ➡️ Charlie ₹1000

Bob ➡️ Charlie ₹1000

📤 Export
Export PDF includes:

Title: PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)

Subtitle: Repayment Summary

Sections: Unoptimized and Optimized Transactions with headers + timestamp

Export CSV includes:

Both tables with headers in a single file

🔄 Reset
Click the Reset button to clear all transactions and start over.

🧪 Sample Use Case
Trip with Friends:

A pays ₹3000

B pays ₹1500

C pays ₹0

Split equally among 3

Without PocketFlow: Manual and confusing math
With PocketFlow:

C ➡️ A ₹1500

C ➡️ B ₹500

Done in just 2 transactions!

📦 Dependencies
React

TailwindCSS

jsPDF + jspdf-autotable for PDF export

react-csv for CSV export

🙌 Author
Made with ❤️ by Nilesh Kumar
