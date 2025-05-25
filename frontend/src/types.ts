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