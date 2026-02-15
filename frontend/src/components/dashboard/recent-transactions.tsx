import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  ShoppingCart, 
  Car, 
  Home, 
  Utensils,
  MoreHorizontal,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import { listTransactionsService } from "@/services/transaction";
import { toast } from "@/hooks/use-toast";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-4">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {transaction.description}
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {transaction.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {transaction.date}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={cn(
          "text-sm font-medium",
          transaction.type === "income" ? "text-income" : "text-foreground"
        )}>
          {transaction.type === "income" ? "+" : ""}
          ${Math.abs(transaction.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export function RecentTransactions() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const data = await listTransactionsService();
      setTransactions(data.slice(0, 6));
    } catch (error) {
      toast({
        title: "Failed to load transactions",
        description: "Failed to load recent transactions. Please try again later",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.uid} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}