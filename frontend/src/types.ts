export const AccountTypes = Object.freeze({
    SAVINGS: "savings",
    INVESTMENTS: "investments",
    SALARY: "salary",
    UPI: "upi",
    CREDIT: "credit"
});

export const AccountStatus = Object.freeze({
    ACTIVE: "active",
    INACTIVE: "inactive"
});

export const TransactionType = Object.freeze({
    WITHDRAW: "withdraw",
    DEPOSIT: "deposit"
})

export const TransactionCategory = Object.freeze({
    FOOD: "food",
    CLOTHING: "clothing",
    SHOPPING: "shopping",
    RENT: "rent",
    TELECOM: "telecom",
    TRAVEL: "travel",
    LEISURE: "leisure",
    OTHER: "other"
})

export type Bank = {
    id: number,
    name: string
}

export type Account = {
    id: number,
    name: string,
    type: string,
    bank: Bank,
    balance: number,
    status: string
}

export type Transaction = {
    id: number,
    type: string,
    description: string,
    created_at: string,
    transaction_date: string,
    amount: number,
    category: string,
    last_updated: string,
    account_id: number
}