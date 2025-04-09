import { Heap } from 'heap-js';

export function minimizeCashFlow(transactions) {
  const balanceMap = {};

  transactions.forEach(({ from, to, amount }) => {
    balanceMap[from] = (balanceMap[from] || 0) - amount;
    balanceMap[to] = (balanceMap[to] || 0) + amount;
  });

  const creditHeap = new Heap((a, b) => b.amount - a.amount);
  const debitHeap = new Heap((a, b) => a.amount - b.amount);

  Object.entries(balanceMap).forEach(([name, amount]) => {
    if (amount > 0) creditHeap.push({ name, amount });
    else if (amount < 0) debitHeap.push({ name, amount });
  });

  const result = [];

  while (!creditHeap.isEmpty() && !debitHeap.isEmpty()) {
    const creditor = creditHeap.pop();
    const debtor = debitHeap.pop();

    const settledAmount = Math.min(creditor.amount, -debtor.amount);

    result.push({
      from: debtor.name,
      to: creditor.name,
      amount: settledAmount,
    });

    creditor.amount -= settledAmount;
    debtor.amount += settledAmount;

    if (creditor.amount > 0) creditHeap.push(creditor);
    if (debtor.amount < 0) debitHeap.push(debtor);
  }

  return result;
}
