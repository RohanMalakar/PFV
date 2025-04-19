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
  budgets: Budget[];
}

export interface Budget {
  category: string;
  amount: number;
  month: string; // Format: YYYY-MM
}

export interface SpendingInsight {
  category: string;
  totalSpent: number;
  budget: number;
  percentage: number;
  trend: 'over' | 'under' | 'on-track';
}