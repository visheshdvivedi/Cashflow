import React from "react";
import Sidebar from "../components/common/Sidebar";

import { BsCashCoin } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const DashboardPage = () => {
    const durationTabs = ["Day", "Week", "Month", "Year", "Lifetime"];
    const statCards = [
        {
            title: "Total Balance",
            value: "24,562.00",
            icon: <MdAccountBalanceWallet size={16} />,
            colorClass: "bg-blue-200 text-blue-700",
            difference: 3.5,
        },
        {
            title: "Monthly Income",
            value: "92,292.34",
            icon: <FaCashRegister size={16} />,
            colorClass: "bg-green-200 text-green-700",
            difference: 2.4,
        },
        {
            title: "Monthly Expense",
            value: "10,234.00",
            icon: <BsCashCoin size={16} />,
            colorClass: "bg-red-200 text-red-700",
            difference: -10.5,
        },
        {
            title: "Monthly Savings",
            value: "35,435.00",
            icon: <FaMoneyBillTrendUp size={16} />,
            colorClass: "bg-violet-200 text-violet-700",
            difference: 5.6,
        },
    ];

    const data = [
        {
            name: "Jan",
            income: 4000,
            expense: 2400,
            saving: 2400,
        },
        {
            name: "Feb",
            income: 3000,
            expense: 1398,
            saving: 2210,
        },
        {
            name: "Mar",
            income: 2000,
            expense: 9800,
            saving: 2290,
        },
        {
            name: "Apr",
            income: 2780,
            expense: 3908,
            saving: 2000,
        },
        {
            name: "May",
            income: 1890,
            expense: 4800,
            saving: 2181,
        },
        {
            name: "Jun",
            income: 2390,
            expense: 3800,
            saving: 2500,
        },
        {
            name: "Jul",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
        {
            name: "Aug",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
        {
            name: "Sep",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
        {
            name: "Oct",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
        {
            name: "Nov",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
        {
            name: "Dec",
            income: 3490,
            expense: 4300,
            saving: 2100,
        },
    ];

    const totalExpense = 23600;
    const pieChartData = [
        { name: "Rent", value: 19000 },
        { name: "Food", value: 2000 },
        { name: "Transport", value: 1000 },
        { name: "Shopping", value: 1000 },
        { name: "Other", value: 600 },
    ];
    const pieChartColors = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A28EFF",
        "#FF6699",
        "#00B8D9",
        "#FFD700",
        "#FF6E40",
        "#36D399",
        "#845EC2",
        "#F9A826",
        "#F95F62",
        "#3DDC84",
    ];

    const [selectedDurationTab, setSelectedDurationTab] =
        React.useState<string>("Day");

    const onDurationTabSelect = (tab: string) => {
        setSelectedDurationTab(tab);
    };

    const getPercentage = (value: number) => {
        return (value / totalExpense) * 100;
    }

    return (
        <div className="flex flex-row h-screen font-[Roboto]">
            <Sidebar />
            <div className="px-6 py-5 bg-slate-100 flex-1">
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
                        <h2 className="text-lg font-light">
                            Track your finances at a glance
                        </h2>
                    </div>
                    <div className="flex flex-row bg-white gap-3 px-3 py-2 rounded-lg text-sm">
                        {durationTabs.map((tab) => (
                            <button
                                className={`p-2 rounded-lg ${selectedDurationTab === tab
                                        ? "bg-slate-200 hover:bg-slate-200"
                                        : "bg-white hover:bg-slate-100"
                                    }`}
                                onClick={() => onDurationTabSelect(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center gap-3 mt-8">
                    {statCards.map((card, index) => (
                        <div className="bg-white px-4 py-3 rounded-lg flex flex-col gap-3 min-w-[23%]">
                            <div className="flex flex-row justify-between items-center">
                                <h2 className="text-sm text-slate-600">{card.title}</h2>
                                <div
                                    className={`p-2 rounded-full flex flex-row justify-center items-center ${card.colorClass}`}
                                >
                                    {card.icon}
                                </div>
                            </div>

                            <h2 className="font-bold text-2xl font-mono">${card.value}</h2>

                            <div className="flex flex-row gap-1 items-center text-sm text-slate-400">
                                <span
                                    className={`${card.difference > 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {card.difference > 0 ? (
                                        <IoIosTrendingUp />
                                    ) : (
                                        <IoIosTrendingDown />
                                    )}
                                </span>
                                <span
                                    className={`${card.difference > 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {" "}
                                    {card.difference}
                                </span>
                                <span> since last {selectedDurationTab.toLowerCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-between items-center gap-3 mt-8 w-[49%] h-[300px] bg-white py-4 text-sm">
                        <h3>Income vs Expense vs Savings</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#5EA500"
                                    activeDot={{ r: 8 }}
                                />
                                <Line type="monotone" dataKey="expense" stroke="#E7000B" />
                                <Line type="monotone" dataKey="saving" stroke="#165DFB" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col justify-start items-center gap-3 mt-8 w-[49%] h-[300px] bg-white py-4 text-sm">
                        <h3>Expense Categories</h3>
                        <div className="flex flex-row justify-evenly items-center w-full">
                            <PieChart
                                width={300}
                                height={200}
                                onMouseEnter={(state, event) => console.log(state, event)}
                            >
                                <Pie
                                    data={pieChartData}
                                    width={500}
                                    height={100}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={pieChartColors[index % pieChartColors.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="w-[200px] flex flex-col gap-2">
                                {pieChartData.slice(0, 5).map((data, index) => (
                                    <div className="p-1 flex flex-col w-full">
                                        <span>{data.name}</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div
                                                className={`h-2 rounded-full`}
                                                style={{width: `${getPercentage(data.value)}%`, backgroundColor: pieChartColors[index]}}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
