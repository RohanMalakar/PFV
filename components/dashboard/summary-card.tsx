import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  value: string
  icon: React.ReactNode
  className?: string
  trend?: {
    value: number
    label: string
  }
}

export function SummaryCard({
  title,
  value,
  icon,
  className,
  trend,
}: SummaryCardProps) {
  const isPositive = trend ? trend.value >= 0 : false

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            <span>{isPositive ? "+" : ""}{trend.value}%</span>
            <span className="text-muted-foreground ml-1">{trend.label}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}