export interface Transaction {
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string; 
}

export interface TransactionQuery {
  type?: "income" | "expense";
  category?: string;
  startDate?: string; 
  endDate?: string;   
  minAmount?: number;
  maxAmount?: number;
}
