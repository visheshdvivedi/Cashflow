import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreateGoalModal } from "@/components/modals/create-goal-modal";
import { Plus, Target, Calendar, DollarSign, TrendingUp } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build a 6-month emergency fund",
    targetAmount: 15000,
    currentAmount: 8500,
    targetDate: "2024-12-31",
    category: "Emergency",
    monthlyContribution: 500,
    progress: 57,
    status: "on-track"
  },
  {
    id: 2,
    title: "Vacation to Europe",
    description: "Save for a 2-week trip to Europe",
    targetAmount: 5000,
    currentAmount: 3200,
    targetDate: "2024-07-15",
    category: "Travel",
    monthlyContribution: 400,
    progress: 64,
    status: "ahead"
  },
  {
    id: 3,
    title: "New Car Down Payment",
    description: "Save for a down payment on a new car",
    targetAmount: 8000,
    currentAmount: 2100,
    targetDate: "2024-09-30",
    category: "Transportation",
    monthlyContribution: 600,
    progress: 26,
    status: "behind"
  },
  {
    id: 4,
    title: "Home Renovation",
    description: "Kitchen and bathroom renovation",
    targetAmount: 25000,
    currentAmount: 12500,
    targetDate: "2025-03-31",
    category: "Home",
    monthlyContribution: 800,
    progress: 50,
    status: "on-track"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ahead": return "text-chart-1";
    case "on-track": return "text-chart-3";
    case "behind": return "text-chart-2";
    default: return "text-muted-foreground";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ahead": return <Badge className="bg-chart-1/20 text-chart-1 hover:bg-chart-1/30">Ahead of Schedule</Badge>;
    case "on-track": return <Badge className="bg-chart-3/20 text-chart-3 hover:bg-chart-3/30">On Track</Badge>;
    case "behind": return <Badge variant="destructive">Behind Schedule</Badge>;
    default: return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function Goals() {
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Financial Goals</h1>
          <CreateGoalModal>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          </CreateGoalModal>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goal Amount</p>
                  <p className="text-2xl font-bold text-foreground">${totalGoalAmount.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-2xl font-bold text-foreground">${totalSaved.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Contributions</p>
                  <p className="text-2xl font-bold text-foreground">${totalMonthlyContributions.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  {getStatusBadge(goal.status)}
                </div>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Goal Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Target Date</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">${goal.monthlyContribution}</span>
                    </div>
                  </div>
                </div>

                {/* Amount Remaining */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount Remaining</span>
                    <span className="font-bold text-foreground">
                      ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Add Contribution
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Edit Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}