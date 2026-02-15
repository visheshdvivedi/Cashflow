import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const spendingData = [
  { name: "Food & Dining", value: 865, color: "hsl(var(--expense))" },
  { name: "Groceries", value: 542, color: "hsl(var(--primary))" },
  { name: "Transportation", value: 320, color: "hsl(var(--info))" },
  { name: "Shopping", value: 456, color: "hsl(var(--warning))" },
  { name: "Utilities", value: 234, color: "hsl(var(--accent-foreground))" },
  { name: "Entertainment", value: 189, color: "hsl(var(--savings))" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="500"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function SpendingChart({ data }) {
  
  function getPercentage(value: number) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return ((value / total) * 100).toFixed(1);
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              width={300}
              height={200}
              onMouseEnter={(state, event) => console.log(state, event)}
            >
              <Pie
                data={data}
                width={500}
                height={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`${entry.color}`} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full flex flex-col gap-2">
          {data.slice(0, 5).map((data, index) => (
            <div className="p-1 flex flex-col w-full">
              <span>{data.name}</span>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full`}
                  style={{ width: `${getPercentage(data.value)}%`, backgroundColor: data.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
