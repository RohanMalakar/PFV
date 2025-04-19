"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { Transaction } from "@/types"
import { loadTransactions, saveTransactions } from "@/lib/transactions"

export default function NewTransactionPage() {
  const router = useRouter()
  
  const handleSave = (transaction: Transaction) => {
    try {
      const currentTransactions = loadTransactions()
      const updatedTransactions = [...currentTransactions, transaction]
      saveTransactions(updatedTransactions)
      router.push("/transactions")
    } catch (error) {
      console.error('Error saving transaction:', error)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Add Transaction</h1>
          <p className="text-muted-foreground">
            Create a new transaction to track your finances
          </p>
        </div>
        
        <TransactionForm onSave={handleSave} />
      </main>
      
      <Footer />
    </div>
  )
}