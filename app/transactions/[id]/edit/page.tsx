"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { Transaction } from "@/types";
import { loadTransactions, saveTransactions } from "@/lib/transactions";

export default function EditTransactionPage() {
  const params = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const transactions = loadTransactions();
    const found = transactions.find((t) => t.id === id);

    if (!found) {
      router.push("/transactions");
      return;
    }

    setTransaction(found);
    setIsLoading(false);
  }, [params.id, router]);

  const handleSave = (updatedTransaction: Transaction) => {
    const transactions = loadTransactions();
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    saveTransactions(updatedTransactions);
    router.push("/transactions");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="h-96 rounded-lg bg-muted animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Edit Transaction</h1>
          <p className="text-muted-foreground">Update your transaction details</p>
        </div>
        {transaction && (
          <TransactionForm transaction={transaction} onSave={handleSave} />
        )}
      </main>
      <Footer />
    </div>
  );
}
