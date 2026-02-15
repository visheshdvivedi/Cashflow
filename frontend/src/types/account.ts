export type Bank = {
    uid: string,
    name: string,
}

export type Account = {
    uid: string,
    name: string,
    type: string,
    bank: Bank,
    balance: number,
    account_no_last_digits: string
}

export const emptyBank: Bank = { uid: "", name: "" };
export const emptyAccount: Account = { uid: "", name: "", type: "", bank: emptyBank, account_no_last_digits: "", balance: 0 }