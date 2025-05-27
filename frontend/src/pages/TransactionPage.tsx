import React from "react";
import Sidebar from "../components/common/Sidebar";
import { Transaction, TransactionType, TransactionCategory } from "../types";
import { FaPencil, FaTrash } from "react-icons/fa6";

const TransactionPage = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([
        {
            id: 1,
            type: TransactionType.DEPOSIT,
            description: "ZOMATO Payment",
            created_at: "2025-05-27T20:27:37.698104",
            transaction_date: "2025-05-27T20:27:37.698104",
            amount: 120,
            category: TransactionCategory.FOOD,
            last_updated: "2025-05-27T20:27:37.698104",
            account_id: 1,
        },
        {
            id: 2,
            type: TransactionType.DEPOSIT,
            description: "Rent payment",
            created_at: "2025-05-27T20:27:37.698104",
            transaction_date: "2025-05-27T20:27:37.698104",
            amount: 19000,
            category: TransactionCategory.RENT,
            last_updated: "2025-05-27T20:27:37.698104",
            account_id: 1,
        },
        {
            id: 2,
            type: TransactionType.WITHDRAW,
            description: "Salary",
            created_at: "2025-05-27T20:27:37.698104",
            transaction_date: "2025-05-27T20:27:37.698104",
            amount: 120,
            category: TransactionCategory.FOOD,
            last_updated: "2025-05-27T20:27:37.698104",
            account_id: 1,
        },
    ]);

    const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction>(transactions[0]);
    const [isCreateModalOpen, setIsCreateModalOpen] =
        React.useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState<boolean>(false);

    const formatAmount = (amount: number) => {
        return amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    return (
        <div className="flex flex-row h-screen font-[Roboto]">
            <Sidebar />
            <div className="px-6 py-5 bg-slate-100 flex-1 flex flex-col">
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Transactions Dashboard</h1>
                        <h2 className="text-lg font-light">Track your transactions</h2>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                        Create +
                    </button>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Account
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {transaction.description}
                                    </th>
                                    <td className="px-6 py-4">{transaction.type}</td>
                                    <td className="px-6 py-4">
                                        ₹{formatAmount(transaction.amount)}
                                    </td>
                                    <td className="px-6 py-4">{transaction.category}</td>
                                    <td className="px-6 py-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{transaction.account_id}</td>
                                    <td className="px-6 py-4 flex flex-row justify-start items-center gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedTransaction(transaction);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="text-blue-500 hover:text-blue-600 cursor-pointer"
                                        >
                                            <FaPencil />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedTransaction(transaction);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
