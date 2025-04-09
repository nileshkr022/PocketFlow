# 💸 PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)

**PocketFlow** is a React-based tool to simplify and optimize cash flow settlements among groups of people. It minimizes the number of transactions required to settle debts.

---

## ✨ Features

- Add transactions (who paid whom and how much)
- Automatically calculate optimized settlements
- Export both Unoptimized & Optimized tables to PDF
- Export both tables to CSV
- Reset all data with one click
- Clean UI powered by TailwindCSS

---

## 🗂️ Project Structure

```bash
PocketFlow/
├── public/
│   └── index.html               # HTML template
├── src/
│   ├── App.js                   # Core logic and components
│   ├── index.js                 # Entry point
│   └── styles.css               # Optional CSS or Tailwind
├── package.json                 # NPM dependencies
├── tailwind.config.js           # Tailwind config (if used)
└── README.md                    # Project documentation
🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/pocketflow.git
cd pocketflow
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm start
🧾 How to Use
➕ Add Transactions
Enter names and amount for who paid whom.

Example:

Alice paid Bob ₹1000

Bob paid Charlie ₹2000

⚡ Optimized Settlements
Calculates minimum number of repayments to settle all balances.

Example Output:

Alice ➡️ Charlie ₹1000

Bob ➡️ Charlie ₹1000

📄 Export to PDF
Includes title: PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)

Subtitle: Repayment Summary

Shows both Unoptimized and Optimized tables

Timestamp included

📁 Export to CSV
Single CSV file containing both:

Unoptimized Transactions

Optimized Settlements

🔄 Reset
One-click to clear all entered data and start over.

💼 Sample Use Case
Trip Split Example:

A paid ₹3000

B paid ₹1500

C paid ₹0

Equal share: ₹1500 each

Optimized Result:

C ➡️ A ₹1500

C ➡️ B ₹500

Only two transactions settle the group expense.

🛠️ Tech Stack
React

TailwindCSS

jsPDF + jsPDF-autotable

react-csv

👨‍💻 Author
Crafted with care by Nilesh Kumar
