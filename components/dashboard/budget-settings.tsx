"use client"

import { useState } from "react"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Budget } from "@/types"
import { CATEGORIES } from "@/lib/data"
import { formatCurrency } from "@/lib/data"

interface BudgetSettingsProps {
  budgets: Budget[];
  onSave: (budgets: Budget[]) => void;
}

export function BudgetSettings({ budgets, onSave }: BudgetSettingsProps) {
  const [newBudget, setNewBudget] = useState<Budget>({
    category: "",
    amount: 0,
    month: new Date().toISOString().slice(0, 7), // Current month in YYYY-MM format
  });

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount > 0) {
      onSave([...budgets, newBudget]);
      setNewBudget({
        category: "",
        amount: 0,
        month: new Date().toISOString().slice(0, 7),
      });
    }
  };

  const handleRemoveBudget = (category: string) => {
    onSave(budgets.filter(b => b.category !== category));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budgets</CardTitle>
        <CardDescription>
          Set monthly spending limits for each category
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select
            value={newBudget.category}
            onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
            <Input
              type="number"
              placeholder="Amount"
              className="pl-8"
              value={newBudget.amount || ""}
              onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
            />
          </div>
          <Button onClick={handleAddBudget}>Add Budget</Button>
        </div>

        <div className="space-y-2">
          {budgets.map((budget) => (
            <div key={budget.category} className="flex items-center justify-between p-2 border rounded-lg">
              <div>
                <span className="font-medium">
                  {CATEGORIES.find(c => c.value === budget.category)?.label}
                </span>
                <span className="text-muted-foreground ml-2">
                  {formatCurrency(budget.amount)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveBudget(budget.category)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 