import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Modal from "../components/common/Modal";

interface Account {
    id: number;
    name: string;
    type: string;
    bank: {
        id: number;
        name: string;
    };
    balance: number;
    status: string;
}

const AccountPage = () => {
    const [accounts, setAccounts] = useState<Account[]>([
        { id: 1, name: "Retirement Savings", type: "savings", bank: { id: 1, name: "HDFC" }, balance: 12345.56565, status: "active" },
        { id: 2, name: "Laptop Savings", type: "savings", bank: { id: 1, name: "HDFC" }, balance: 124231.343, status: "inactive" }
    ]);

    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const accountTypes = [
        "savings",
        "investment",
        "loan",
        "credit",
        "checking",
        "fixed deposit"
    ];

    const formatAmount = (amount: number) => {
        return amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    const handleEdit = (account: Account) => {
        setSelectedAccount(account);
        setIsEditModalOpen(true);
    };

    const handleDelete = (account: Account) => {
        setSelectedAccount(account);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAccount) return;

        setAccounts(accounts.map(acc => 
            acc.id === selectedAccount.id ? selectedAccount : acc
        ));
        setIsEditModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (!selectedAccount) return;

        setAccounts(accounts.filter(acc => acc.id !== selectedAccount.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex flex-row h-screen font-[Roboto]">
            <Sidebar />
            <div className="px-6 py-5 bg-slate-100 flex-1">
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Accounts Dashboard</h1>
                        <h2 className="text-lg font-light">
                            Track your accounts
                        </h2>
                    </div>
                    <button className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
                        Create +
                    </button>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Balance</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Bank</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(account => (
                                <tr key={account.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {account.name}
                                    </th>
                                    <td className="px-6 py-4">{account.type}</td>
                                    <td className="px-6 py-4">₹{formatAmount(account.balance)}</td>
                                    <td className="px-6 py-4">{account.status}</td>
                                    <td className="px-6 py-4">{account.bank.name}</td>
                                    <td className="px-6 py-4 flex flex-row justify-start items-center gap-3">
                                        <button 
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(account)}
                                        >
                                            <FaPencil />
                                        </button>
                                        <button 
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(account)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                <Modal 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    title="Edit Account"
                >
                    {selectedAccount && (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={selectedAccount.name}
                                    onChange={(e) => setSelectedAccount({...selectedAccount, name: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    value={selectedAccount.type}
                                    onChange={(e) => setSelectedAccount({...selectedAccount, type: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {accountTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={selectedAccount.status}
                                    onChange={(e) => setSelectedAccount({...selectedAccount, status: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </Modal>

                {/* Delete Modal */}
                <Modal 
                    isOpen={isDeleteModalOpen} 
                    onClose={() => setIsDeleteModalOpen(false)} 
                    title="Delete Account"
                >
                    <div className="space-y-4">
                        <p>Are you sure you want to delete this account? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AccountPage;
