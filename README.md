# 📘 PocketFlow - Cash Flow Minimizer

**PocketFlow** is a minimal and effective React-based tool that helps groups of people settle shared expenses with the least number of transactions. Ideal for roommates, trips, or any group expense scenario.

---

## 🌟 Features

- ✍️ Add transactions between individuals
- 📉 Minimize cash flow with optimized settlements
- 📄 Export settlements to **PDF** with timestamp and structured tables
- 📁 Export transactions to **CSV** for Excel or Sheets use
- 🔄 Reset data anytime to start fresh

---

## 📂 Folder Structure

```
pocketflow/
├── public/
│   └── index.html
├── src/
│   ├── App.js             # Main React component with full logic & UI
│   ├── index.js           # React DOM rendering
│   └── styles.css         # (Optional) Tailwind CSS
├── package.json           # Dependencies and project scripts
└── README.md              # Project overview and usage
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pocketflow.git
cd pocketflow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 PDF & CSV Export Details

### PDF Includes:
- **Title:** PocketFlow - Cash Flow Minimizer *(by Nilesh Kumar)*
- **Subtitle:** Repayment Summary
- **Two Tables:**
  - Unoptimized Transactions
  - Optimized Settlements
- **Timestamp** at time of export

### CSV Includes:
- Two sections:
  - Unoptimized Transactions
  - Optimized Settlements
- Clean headers and currency formatting

---

## 📌 Example Use Case
**You went on a trip with 3 friends.**
- p1 paid ₹1000 to p2
- p2 paid ₹2000 to p3

Instead of multiple payments, PocketFlow will tell you:
- p1 ➡️ p3: ₹1000
- p2 ➡️ p3: ₹1000

This way, everyone settles up with minimal transactions. ⚖️

---

## 👨‍💻 Author
Built with care by **Nilesh Kumar**
