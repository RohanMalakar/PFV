"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Budget, Transaction, SpendingInsight } from "@/types"
import { formatCurrency } from "@/lib/data"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

interface SpendingInsightsProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function SpendingInsights({ budgets, transactions }: SpendingInsightsProps) {
  // Calculate spending insights for each budgeted category
  const insights: SpendingInsight[] = budgets.map(budget => {
    const actualSpending = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        t.date.startsWith(budget.month)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = (actualSpending / budget.amount) * 100;
    const trend = percentage > 100 ? 'over' : percentage > 80 ? 'on-track' : 'under';

    return {
      category: budget.category,
      totalSpent: actualSpending,
      budget: budget.amount,
      percentage: Math.min(percentage, 100),
      trend,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{insight.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(insight.totalSpent)} / {formatCurrency(insight.budget)}
                </span>
                {insight.trend === 'over' ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : insight.trend === 'on-track' ? (
                  <TrendingUp className="h-4 w-4 text-warning" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </div>
            </div>
            <Progress 
              value={insight.percentage} 
              className={insight.trend === 'over' ? 'bg-destructive/20' : ''}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 