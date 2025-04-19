export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
}

export type TransactionFormData = Omit<Transaction, 'id'>;

export interface MonthlyData {
  month: string;
  expenses: number;
  income: number;
}