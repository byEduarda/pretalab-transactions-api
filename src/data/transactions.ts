export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
};

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-07-15T10:00:00Z",
    description: "Salário de Julho",
    amount: 5000,
    type: "income",
    category: "Salário",
  },
  {
    id: "2",
    date: "2024-07-18T15:30:00Z",
    description: "Conta de Luz",
    amount: 300,
    type: "expense",
    category: "Contas",
  },
];
