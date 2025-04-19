"use client";

import { Transaction, MonthlyData } from '@/types';
import { format, parse, compareDesc } from 'date-fns';

// Local storage key
const STORAGE_KEY = 'finance-transactions';

// Load transactions from local storage
export function loadTransactions(): Transaction[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const transactions = saved ? JSON.parse(saved) : [];
    return Array.isArray(transactions) ? transactions : [];
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return [];
  }
}

// Save transactions to local storage
export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions:', error);
  }
}

// Generate a unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Sort transactions by date (newest first)
export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );
}

// Calculate total income
export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate total expenses
export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

// Calculate balance
export function calculateBalance(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

// Generate monthly data for chart
export function generateMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthlyData: Record<string, MonthlyData> = {};

  // Get current date and 5 months back
  const today = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = format(d, 'yyyy-MM');
    const monthLabel = format(d, 'MMM yyyy');
    months.push({ key: monthKey, label: monthLabel });
    
    monthlyData[monthKey] = {
      month: monthLabel,
      expenses: 0,
      income: 0,
    };
  }

  // Calculate expenses and income for each month
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = format(date, 'yyyy-MM');
    
    if (monthlyData[monthKey]) {
      if (transaction.type === 'expense') {
        monthlyData[monthKey].expenses += transaction.amount;
      } else {
        monthlyData[monthKey].income += transaction.amount;
      }
    }
  });

  // Convert to array and sort by month
  return months.map(month => monthlyData[month.key]);
}

// Group transactions by category
export function groupTransactionsByCategory(transactions: Transaction[]): Record<string, number> {
  const categories: Record<string, number> = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category] += transaction.amount;
    });
    
  return categories;
}