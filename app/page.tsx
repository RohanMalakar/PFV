"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  DollarSign, 
  ArrowDownRightIcon, 
  ArrowUpRightIcon, 
  BarChart4,
  CreditCard,
  Plus, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SummaryCard } from "@/components/dashboard/summary-card"
import { ExpensesChart } from "@/components/dashboard/expenses-chart"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  loadTransactions, 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  calculateBalance,
  generateMonthlyData,
} from "@/lib/transactions"
import { formatCurrency } from "@/lib/data"
import { Transaction } from "@/types"

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load transactions from local storage
    const loadedTransactions = loadTransactions()
    setTransactions(loadedTransactions)
    setIsLoading(false)
  }, [])
  
  const totalIncome = calculateTotalIncome(transactions)
  const totalExpenses = calculateTotalExpenses(transactions)
  const balance = calculateBalance(transactions)
  const monthlyData = generateMonthlyData(transactions)
  
  // Calculate trends (for demo purposes)
  const incomeTrend = totalIncome > 0 ? 12.5 : 0
  const expensesTrend = totalExpenses > 0 ? 8.3 : 0
  const balanceTrend = balance !== 0 ? 4.2 : 0
  
  // Most recent transactions (up to 3)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your personal finance dashboard
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <SummaryCard
                title="Total Balance"
                value={formatCurrency(balance)}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{
                  value: balanceTrend,
                  label: "from last month"
                }}
                className={balance >= 0 ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"}
              />
              <SummaryCard
                title="Total Income"
                value={formatCurrency(totalIncome)}
                icon={<ArrowUpRightIcon className="h-4 w-4" />}
                trend={{
                  value: incomeTrend,
                  label: "from last month"
                }}
                className="border-l-4 border-l-chart-2"
              />
              <SummaryCard
                title="Total Expenses"
                value={formatCurrency(totalExpenses)}
                icon={<ArrowDownRightIcon className="h-4 w-4" />}
                trend={{
                  value: expensesTrend,
                  label: "from last month"
                }}
                className="border-l-4 border-l-chart-1"
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-7 mb-8">
              <div className="md:col-span-5">
                <ExpensesChart data={monthlyData} />
              </div>
              <div className="md:col-span-2">
                <div className="border rounded-lg h-full p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                    <Link href="/transactions">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                  
                  {recentTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[240px] text-center p-4">
                      <CreditCard className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium mb-1">No transactions yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Start tracking your finances by adding transactions
                      </p>
                      <Link href="/transactions/new">
                        <Button className="gap-1">
                          <Plus className="h-4 w-4" /> Add Transaction
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {transaction.type === 'income' ? (
                                <ArrowUpRightIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownRightIcon className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm truncate max-w-[120px]">
                                {transaction.description}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`font-medium text-sm ${
                            transaction.type === 'income' 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/transactions/new">
                <Button className="mx-auto gap-1" size="lg">
                  <Plus className="h-4 w-4" /> Add New Transaction
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}