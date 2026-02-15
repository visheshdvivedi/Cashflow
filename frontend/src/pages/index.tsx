import { Navigation } from "@/components/ui/navigation";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { MonthlyTrend } from "@/components/dashboard/monthly-trend";
import heroImage from "@/assets/finance-dashboard-hero.jpg";
import { useEffect, useState } from "react";
import { getDastboardAnalyticsService } from "@/services/analytics";
import { toast } from "@/hooks/use-toast";

const Index = () => {

  const [analytics, setAnalytics] = useState({
    'card_stats': [],
    'line_chart_stats': [],
    'spending_by_category': []
  });

  const loadAnalytics = async () => {
    try {
      const data = await getDastboardAnalyticsService();
      setAnalytics(data);
    } catch (error) {
      toast({
        title: "Failed to load analytics",
        description: "Failed to load dashboard analytics, please try again",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Finance Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">
              Your Financial Overview
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Track expenses, manage budgets, and achieve your financial goals with ease
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards data={analytics['card_stats']} />
        </div>

        {/* Charts and Transactions */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <MonthlyTrend data={analytics['line_chart_stats']} />
            <RecentTransactions  />
          </div>
          <div>
            <SpendingChart data={analytics['spending_by_category']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
