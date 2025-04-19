"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Edit, 
  Trash2, 
  Search, 
  ChevronUp, 
  ChevronDown,
  AlignJustify, 
  ArrowUpDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types"
import { getCategoryLabel, formatCurrency, formatDate } from "@/lib/data"

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

type SortField = "date" | "amount" | "description" | "category"
type SortOrder = "asc" | "desc"

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  console.log(transactions);
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Text search
    const matchesSearch = search === "" || 
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      getCategoryLabel(transaction.category).toLowerCase().includes(search.toLowerCase())
    
    // Transaction type filter
    const matchesFilter = 
      filter === "all" || 
      transaction.type === filter
    
    return matchesSearch && matchesFilter
  })
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let compareResult = 0
    
    switch(sortField) {
      case "date":
        compareResult = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case "amount":
        compareResult = a.amount - b.amount
        break
      case "description":
        compareResult = a.description.localeCompare(b.description)
        break
      case "category":
        compareResult = a.category.localeCompare(b.category)
        break
    }
    
    return sortOrder === "asc" ? compareResult : -compareResult
  })
  
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />
    return sortOrder === "asc" ? 
      <ChevronUp className="ml-1 h-4 w-4" /> : 
      <ChevronDown className="ml-1 h-4 w-4" />
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          View, filter, and manage your transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row justify-between">
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-8 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={filter}
            onValueChange={(value: "all" | "income" | "expense") => setFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => toggleSort("date")}
                  >
                    Date {getSortIcon("date")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => toggleSort("description")}
                  >
                    Description {getSortIcon("description")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 font-medium hover:bg-transparent whitespace-nowrap"
                    onClick={() => toggleSort("category")}
                  >
                    Category {getSortIcon("category")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount {getSortIcon("amount")}
                  </Button>
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlignJustify className="h-8 w-8 text-muted-foreground" />
                      <div className="text-lg font-medium">No transactions found</div>
                      <p className="text-sm text-muted-foreground">
                        Create a new transaction or adjust your search filters.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className="whitespace-nowrap font-normal bg-secondary text-secondary-foreground"
                      >
                        {getCategoryLabel(transaction.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right ${
                      transaction.type === 'income' 
                        ? 'text-green-500' 
                        : 'text-destructive'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/transactions/${transaction.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this transaction? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => onDelete(transaction.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}