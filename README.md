# PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)

**PocketFlow** is a smart and minimal tool built with **React** that helps you manage shared expenses and automatically settle debts in the most efficient way possible. Whether you're planning a group trip, splitting rent with roommates, or managing any group transaction — PocketFlow has you covered.

---

## 🔧 Features

- 📥 Add unlimited transactions
- 🔄 Automatically calculate **optimized settlements**
- 📤 Export both **Unoptimized** and **Optimized** transactions as:
  - PDF (with proper headings and summary)
  - CSV (formatted for easy spreadsheet use)
- ♻️ Reset all data with one click
- 💡 Clean, responsive UI using **Tailwind CSS**

---

## 🛠️ Technologies Used

- **React** – Frontend library
- **Tailwind CSS** – Styling framework
- **jsPDF + autotable** – PDF export
- **react-csv** – CSV export

---

## 🧪 Example Use Case

Imagine a group of 3 friends on a trip:

| Who Paid     | Who Received | Amount |
|--------------|--------------|--------|
| Alice        | Bob          | ₹1000  |
| Bob          | Charlie      | ₹2000  |

Without optimization:
- 2 transactions are needed.

With **PocketFlow**:
- Alice ➡️ Charlie ₹1000  
- Bob ➡️ Charlie ₹1000

Now only 2 people need to pay one person. ✅

---

## 🗂️ Project Structure

```bash
pocketflow/
├── public/
│   └── index.html
├── src/
│   ├── App.js           # Main app logic and UI
│   ├── index.js         # Entry point
│   └── styles.css       # Tailwind styles (optional)
├── package.json         # Dependencies and scripts
└── README.md
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
3. Run Locally
bash
Copy
Edit
npm start
Visit: http://localhost:3000

📄 Exported PDF & CSV
PDF Includes:

Title: PocketFlow - Cash Flow Minimizer (by Nilesh Kumar)

Subtitle: Repayment Summary

Tables: Unoptimized Transactions + Optimized Settlements

Timestamp

CSV Includes:

Two sections: Unoptimized + Optimized

Clean formatting for importing to Excel/Sheets

👨‍💻 Author
Made with care by Nilesh Kumar
