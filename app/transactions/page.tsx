"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TransactionList } from "@/components/transactions/transaction-list"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Transaction } from "@/types"
import { loadTransactions, saveTransactions } from "@/lib/transactions"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load transactions from local storage
    const loadedTransactions = loadTransactions()
    setTransactions(loadedTransactions)
    setIsLoading(false)
  }, [])
  
  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id)
    setTransactions(updatedTransactions)
    saveTransactions(updatedTransactions)
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Transactions</h1>
            <p className="text-muted-foreground">
              Manage and view all your financial transactions
            </p>
          </div>
          <Link href="/transactions/new">
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="h-96 rounded-lg bg-muted animate-pulse" />
        ) : (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        )}
      </main>
      
      <Footer />
    </div>
  )
}