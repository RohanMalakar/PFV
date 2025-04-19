"use client"

import { useState } from "react"
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { MonthlyData } from "@/types"

interface ExpensesChartProps {
  data: MonthlyData[]
}

export function ExpensesChart({ data }: ExpensesChartProps) {
  const [chartType, setChartType] = useState<"expenses" | "income" | "both">("both")
  
  // Custom tooltip formatter
  const formatTooltip = (value: number) => {
    return `₹${value.toFixed(2)}`
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>
            Your financial activity for the past 6 months
          </CardDescription>
        </div>
        <Select
          value={chartType}
          onValueChange={(value: "expenses" | "income" | "both") => setChartType(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="both">Income & Expenses</SelectItem>
            <SelectItem value="income">Income Only</SelectItem>
            <SelectItem value="expenses">Expenses Only</SelectItem>
          </SelectContent>
        </Select>
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
              dataKey="month" 
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
              labelStyle={{
                fontWeight: "bold",
                marginBottom: "4px",
                textAlign: "center"
              }}
            />
            <Legend />
            {(chartType === "income" || chartType === "both") && (
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="hsl(var(--chart-2))" 
                animationDuration={500}
                radius={[4, 4, 0, 0]}
              />
            )}
            {(chartType === "expenses" || chartType === "both") && (
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="hsl(var(--chart-1))" 
                animationDuration={500}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}