import React from "react";
import Sidebar from "../components/common/Sidebar";
import Modal from "../components/common/Modal";

import { Account, AccountTypes, AccountStatus, Bank } from "../types";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const BANKS: Bank[] = [
    { id: 1, name: "HDFC" },
    { id: 2, name: "Axis" }
]

const capitalize = (str: string) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

const CreateModalChild = ({ onCreate }: { onCreate: (account: Account) => void }) => {

    const [account, setAccount] = React.useState<Account>({
        id: -1,
        name: "",
        type: AccountTypes.SAVINGS,
        status: AccountStatus.ACTIVE,
        balance: 0,
        bank: BANKS[0]
    });

    return (
        <div className="flex flex-col gap-3">
            <input placeholder="Enter account name" className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" type="text" name="name" id="create-account-name" value={account.name} onChange={(e) => setAccount({ ...account, "name": e.target.value })} />
            <select className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" name="account-type" id="create-account-type" value={account.type} onChange={(e) => setAccount({ ...account, "type": e.target.value })}>
                <option value="" selected disabled hidden>Select account type ...</option>
                {Object.keys(AccountTypes).map((type, index) => (
                    <option value={type} key={index}>{capitalize(type)}</option>
                ))}
            </select>
            <select className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" name="account-bank" id="create-account-bank" value={account.bank.name} onChange={(e) => setAccount({ ...account, "bank": BANKS.filter(bank => bank.name === e.target.value)[0] })}>
                <option value="" selected disabled hidden>Select account bank ...</option>
                {BANKS.map(type => (
                    <option value={type.name} key={type.id}>{capitalize(type.name)}</option>
                ))}
            </select>
            <input placeholder="Enter account balance" className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" type="number" min={0} max={1000000} name="balance" id="create-account-balance" value={account.balance} onChange={(e) => setAccount({ ...account, balance: parseInt(e.target.value) })} />
            <button onClick={() => onCreate(account)} className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
                Create
            </button>
        </div>
    )
}

const EditModalChild = ({ initialValue, onEdit }:{ initialValue: Account, onEdit: (account: Account) => void }) => {
    
    const [account, setAccount] = React.useState<Account>(initialValue);

    return (
        <div className="flex flex-col gap-3">
            <input placeholder="Enter account name" className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" type="text" name="name" id="create-account-name" value={account.name} onChange={(e) => setAccount({ ...account, "name": e.target.value })} />
            <select className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" name="account-type" id="create-account-type" value={account.type} onChange={(e) => setAccount({ ...account, "type": e.target.value })}>
                <option value="" selected disabled hidden>Select account type ...</option>
                {Object.keys(AccountTypes).map((type, index) => (
                    <option value={type} key={index}>{capitalize(type)}</option>
                ))}
            </select>
            <select className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" name="account-bank" id="create-account-bank" value={account.bank.name} onChange={(e) => setAccount({ ...account, "bank": BANKS.filter(bank => bank.name === e.target.value)[0] })}>
                <option value="" selected disabled hidden>Select account bank ...</option>
                {BANKS.map(type => (
                    <option value={type.name} key={type.id}>{capitalize(type.name)}</option>
                ))}
            </select>
            <input placeholder="Enter account balance" className="mb-2 focus-visible:outline-none border-b-2 border-blue-500" type="number" min={0} max={1000000} name="balance" id="create-account-balance" value={account.balance} onChange={(e) => setAccount({ ...account, balance: parseInt(e.target.value) })} />
            <button onClick={() => onEdit(account)} className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
                Edit
            </button>
        </div>
    )
}

const AccountPage = () => {

    const [accounts, setAccounts] = React.useState<Account[]>([
        { id: 1, name: "Retirement Savings", type: AccountTypes.SAVINGS, bank: BANKS[0], balance: 12345.56565, status: AccountStatus.ACTIVE },
        { id: 2, name: "Laptop Savings", type: AccountTypes.SAVINGS, bank: BANKS[0], balance: 124231.343, status: AccountStatus.INACTIVE }
    ]);

    const [selectedAccount, setSelectedAccount] = React.useState<Account>();
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);

    const formatAmount = (amount: number) => {
        return amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    const onAccountCreate = (account: Account) => {
        setAccounts([ ...accounts, account]);
        setIsCreateModalOpen(false);
    }

    const onAccountEdit = (account: Account) => {
        setAccounts(prev => {
            const index = prev.findIndex(acc => acc.id === account.id);
            prev[index] = account;
            return prev;
        })
        setIsEditModalOpen(false);
    }

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
                    <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
                        Create +
                    </button>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Balance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(account => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {account.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {account.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹{formatAmount(account.balance)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {account.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {account.bank.name}
                                    </td>
                                    <td className="px-6 py-4 flex flex-row justify-start items-center gap-3">
                                        <button onClick={() => { setSelectedAccount(account); setIsEditModalOpen(true); }} className="text-blue-500 hover:text-blue-600 cursor-pointer">
                                            <FaPencil />
                                        </button>
                                        <button className="text-red-500 hover:text-red-600 cursor-pointer">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Create account modal */}
                <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title={"Create Account"} children={<CreateModalChild onCreate={onAccountCreate} />} />

                {/* Edit account modal */}
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={"Edit Account"} children={<EditModalChild onEdit={onAccountEdit} initialValue={selectedAccount} />} />

            </div>
        </div>
    );
};

export default AccountPage;
