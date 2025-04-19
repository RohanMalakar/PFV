import { Transaction } from '@/types';

// Categories for transactions
export const CATEGORIES = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'housing', label: 'Housing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'personal', label: 'Personal Care' },
  { value: 'education', label: 'Education' },
  { value: 'travel', label: 'Travel' },
  { value: 'gifts', label: 'Gifts & Donations' },
  { value: 'income', label: 'Income' },
  { value: 'other', label: 'Other' },
];

// Sample transactions data
export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    date: '2023-04-01',
    description: 'Monthly Salary',
    type: 'income',
    category: 'income',
  },
  {
    id: '2',
    amount: 45.5,
    date: '2023-04-02',
    description: 'Grocery Shopping',
    type: 'expense',
    category: 'food',
  },
  {
    id: '3',
    amount: 30,
    date: '2023-04-03',
    description: 'Gas',
    type: 'expense',
    category: 'transportation',
  },
  {
    id: '4',
    amount: 15.99,
    date: '2023-04-05',
    description: 'Movie Tickets',
    type: 'expense',
    category: 'entertainment',
  },
  {
    id: '5',
    amount: 80,
    date: '2023-04-10',
    description: 'Electricity Bill',
    type: 'expense',
    category: 'utilities',
  }
];

// Default new transaction
export const DEFAULT_TRANSACTION = {
  amount: 0,
  date: new Date().toISOString().split('T')[0],
  description: '',
  type: 'expense' as const,
  category: 'other',
};

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Get category label
export function getCategoryLabel(categoryValue: string): string {
  const category = CATEGORIES.find(c => c.value === categoryValue);
  return category ? category.label : 'Other';
}