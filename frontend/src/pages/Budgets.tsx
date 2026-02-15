import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreateBudgetModal } from "@/components/modals/create-budget-modal";
import { Plus, Edit, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const budgets = [
  { 
    id: 1, 
    category: "Food & Dining", 
    budgeted: 800, 
    spent: 654, 
    remaining: 146, 
    percentage: 82,
    status: "warning"
  },
  { 
    id: 2, 
    category: "Transportation", 
    budgeted: 300, 
    spent: 245, 
    remaining: 55, 
    percentage: 82,
    status: "good"
  },
  { 
    id: 3, 
    category: "Entertainment", 
    budgeted: 200, 
    spent: 285, 
    remaining: -85, 
    percentage: 143,
    status: "exceeded"
  },
  { 
    id: 4, 
    category: "Shopping", 
    budgeted: 400, 
    spent: 156, 
    remaining: 244, 
    percentage: 39,
    status: "good"
  },
  { 
    id: 5, 
    category: "Utilities", 
    budgeted: 250, 
    spent: 230, 
    remaining: 20, 
    percentage: 92,
    status: "warning"
  },
];

const budgetHistory = [
  { month: "December 2023", totalBudget: 2500, totalSpent: 2341, performance: 94 },
  { month: "November 2023", totalBudget: 2500, totalSpent: 2678, performance: 107 },
  { month: "October 2023", totalBudget: 2500, totalSpent: 2234, performance: 89 },
];

export default function Budgets() {
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
          <CreateBudgetModal>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </CreateBudgetModal>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budgeted</p>
                  <p className="text-2xl font-bold text-foreground">${totalBudgeted.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">${totalSpent.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-chart-1' : 'text-chart-2'}`}>
                    ${Math.abs(totalRemaining).toLocaleString()}
                  </p>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${totalRemaining >= 0 ? 'bg-chart-1/20' : 'bg-chart-2/20'}`}>
                  {totalRemaining < 0 && <AlertTriangle className="h-4 w-4 text-chart-2" />}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Monthly Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget) => (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{budget.category}</h3>
                      {budget.status === "exceeded" && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Over Budget
                        </Badge>
                      )}
                      {budget.status === "warning" && (
                        <Badge variant="secondary" className="text-xs">
                          Close to Limit
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        ${budget.spent} / ${budget.budgeted}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(budget.percentage, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{budget.percentage}% used</span>
                    <span className={budget.remaining >= 0 ? "text-chart-1" : "text-chart-2"}>
                      {budget.remaining >= 0 ? `$${budget.remaining} remaining` : `$${Math.abs(budget.remaining)} over`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget History */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetHistory.map((history, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium">{history.month}</h3>
                    <p className="text-sm text-muted-foreground">
                      Budget: ${history.totalBudget} | Spent: ${history.totalSpent}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={history.performance <= 100 ? "default" : "destructive"}>
                      {history.performance}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {history.performance <= 100 ? "Under Budget" : "Over Budget"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}