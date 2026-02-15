import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  type: "balance" | "income" | "expense" | "savings";
}

function SummaryCard({ title, amount, change, trend, icon, type }: SummaryCardProps) {
  const getTrendColor = () => {
    if (type === "expense" && trend === "up") return "text-expense";
    if (type === "income" && trend === "up") return "text-income";
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  const getCardStyles = () => {
    switch (type) {
      case "balance":
        return "bg-gradient-primary text-primary-foreground";
      case "income":
        return "bg-card shadow-card";
      case "expense":
        return "bg-card shadow-card";
      case "savings":
        return "bg-gradient-accent";
      default:
        return "bg-card shadow-card";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", getCardStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          type === "balance" ? "text-primary-foreground" : "text-card-foreground"
        )}>
          {title}
        </CardTitle>
        <div className={cn(
          "p-1 rounded-full",
          type === "balance" ? "bg-primary-foreground/20" : "bg-accent"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold",
          type === "balance" ? "text-primary-foreground" : "text-card-foreground"
        )}>
          {formatCurrency(parseFloat(amount))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : trend === "down" ? (
            <TrendingDown className="h-3 w-3 mr-1" />
          ) : null}
          <span className={getTrendColor()}>{change}</span>
          <span className={cn(
            "ml-1",
            type === "balance" ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCards({ data }) {
  let summaryData = [];

  if (data.length) {
    summaryData = [

      {
        title: data[0]['title'],
        amount: data[0]['amount'],
        change: data[0]['change'],
        trend: data[0]['trend'],
        icon: <DollarSign className="h-4 w-4" />,
        type: "balance" as const,
      },
      {
        title: data[1]['title'],
        amount: data[1]['amount'],
        change: data[1]['change'],
        trend: data[1]['trend'],
        icon: <TrendingUp className="h-4 w-4 text-income" />,
        type: "income" as const,
      },
      {
        title: data[2]['title'],
        amount: data[2]['amount'],
        change: data[2]['change'],
        trend: data[2]['trend'],
        icon: <TrendingDown className="h-4 w-4 text-expense" />,
        type: "expense" as const,
      },
      {
        title: data[3]['title'],
        amount: data[3]['amount'],
        change: data[3]['change'],
        trend: data[3]['trend'],
        icon: <PiggyBank className="h-4 w-4 text-savings" />,
        type: "savings" as const,
      }
    ]
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((data, index) => (
        <SummaryCard key={index} {...data} />
      ))}
    </div>
  );
}