import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const monthlyData = [
  { month: "Jul", income: 4800, expenses: 3200, savings: 1600 },
  { month: "Aug", income: 5200, expenses: 3100, savings: 2100 },
  { month: "Sep", income: 4900, expenses: 3400, savings: 1500 },
  { month: "Oct", income: 5100, expenses: 3300, savings: 1800 },
  { month: "Nov", income: 5000, expenses: 3500, savings: 1500 },
  { month: "Dec", income: 5240, expenses: 3456, savings: 1784 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function MonthlyTrend({ data }) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="hsl(var(--income))" 
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="hsl(var(--expense))" 
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="hsl(var(--savings))" 
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}