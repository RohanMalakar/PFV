"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Budget, Transaction } from "@/types"
import { formatCurrency } from "@/lib/data"

interface BudgetChartProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetChart({ budgets, transactions }: BudgetChartProps) {
  // Calculate actual spending for each budgeted category
  const data = budgets.map(budget => {
    const actualSpending = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        t.date.startsWith(budget.month)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category,
      budget: budget.amount,
      actual: actualSpending,
    };
  });

  // Custom tooltip formatter
  const formatTooltip = (value: number) => {
    return `₹${value.toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual Spending</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="category" 
              className="text-xs fill-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickFormatter={formatTooltip}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--popover-foreground))",
                borderRadius: "var(--radius)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            />
            <Legend />
            <Bar 
              dataKey="budget" 
              name="Budget" 
              fill="hsl(var(--chart-2))" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="actual" 
              name="Actual" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 