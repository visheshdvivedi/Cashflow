import { Account, emptyAccount } from "./account"

export type Transaction = {
    account: Account,
    amount: number,
    category: string,
    date: string,
    description: string,
    type: string,
    uid: string,
    payment_method: string,
    is_recurring: boolean,
    notes: string
}

export type CategorizationRule = {
    uid: string,
    substring: string,
    description: string,
    category: string,
    priority: number,
    is_active: boolean
}

export type ManualCategorizationRequest = {
    uid: string,
    transaction: string,
    status: string,
    narration: string
}

export const emptyTransaction: Transaction = { uid: "", account: emptyAccount, amount: null, category: "", date: "", description: "", type: "", payment_method: "", is_recurring: false, notes: "" }
export const emptyCategorizationRule: CategorizationRule = { uid: "", substring: "", description: "", category: "", priority: 1, is_active: false }
export const emptyMCR: ManualCategorizationRequest = { uid: "", transaction: "", status: "", narration: "" }