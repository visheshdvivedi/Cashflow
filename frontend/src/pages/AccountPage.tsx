import React from "react";
import Sidebar from "../components/common/Sidebar";

const AccountPage = () => {

    const accounts = [
        { name: "Retirement Savings", type: "savings", bank: { name: "HDFC", image: "HDFC.png" }, amount: 12345.56565 },
        { name: "Laptop Savings", type: "savings", bank: { name: "HDFC", image: "HDFC.png" }, amount: 124231.343 }
    ]

    const formatAmount = (amount: number) => {
        return amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    return (
        <div className="flex flex-row h-screen font-[Roboto]">
            <Sidebar />
            <div className="px-6 py-5 bg-slate-100 flex-1">
                <div className="">
                    <h1 className="text-3xl font-bold">Accounts Dashboard</h1>
                    <h2 className="text-lg font-light">
                        Track your accounts
                    </h2>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h2 className="text-2xl font-semibold">Savings Accounts</h2>
                        <button className="text-blue-600 hover:underline cursor-pointer">View More</button>
                    </div>
                    <div className="w-full flex flex-row gap-5 bg-white px-6 py-4 rounded-lg">
                        { accounts.filter(account => account.type === "savings").map((account, index) => (
                            <div className="bg-slate-100 shadow rounded-lg px-4 py-3" key={index}>
                                <div className="flex flex-row justify-start items-center gap-5">
                                    <img src={account.bank.image} alt={account.bank.name} width={60} />
                                    <div>
                                        <h3 className="font-bold">{account.name}</h3>
                                        <h4 className="text-3xl font-mono">₹{formatAmount(account.amount)}</h4>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
