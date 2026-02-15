import { CategorizationRule, Transaction } from "@/types/transaction";
import axiosInstance from "./base";

export const listTransactionTypesService = async () => {
    const response = await axiosInstance.get("/transactions/types");
    return response.data;
}

export const listTransactionCategoriesService = async () => {
    const response = await axiosInstance.get("/transactions/categories");
    return response.data;
}

export const listTransactionPaymentMethodsService = async () => {
    const response = await axiosInstance.get("/transactions/payment_methods");
    return response.data;
}

export const listTransactionRecurringFrequenciesService = async () => {
    const response = await axiosInstance.get("/transactions/recurring_frequencies");
    return response.data;
}

export const listTransactionsService  = async (): Promise<Transaction[]> => {
    const response = await axiosInstance.get(
        "/transactions/"
    )
    return response.data;
}

export const createTransactionService = async (
    amount, date, description, account, category, payment_method, notes, is_recurring
) => {
    const response = await axiosInstance.post("/transactions/", {
        amount, date, description, account, category, payment_method, notes, is_recurring
    });
    return response.data;
}

export const updateTransactionService = async (
    uid, amount, date, description, account, category, payment_method, notes, is_recurring
) => {
    const response = await axiosInstance.put(`/transactions/${uid}/`, {
        amount, date, description, account, category, payment_method, notes, is_recurring
    });
    return response.data;
}

export const deleteTransactionService = async (uid: string) => {
    const response = await axiosInstance.delete(`/transactions/${uid}/`);
    return response.data;
}

export const bulkUploadTransactionsService = async (content: string, account: string) => {
    const response = await axiosInstance.post(`/transactions/bulk-upload/`, {
        content, account
    });
    return response.data;
}

export const listCategorizationRulesService = async () => {
    const response = await axiosInstance.get(`/rules/`)
    return response.data;
}

export const createCategorizationRuleService = async (
    substring, description, category, priority, isActive
) => {
    const response = await axiosInstance.post(`/rules/`, {
        substring, description, category, priority, is_active: isActive
    });
    return response.data;
}

export const updateCategorizationRuleService = async (
    uid, substring, description, category, priority, isActive
) => {
    const response = await axiosInstance.put(`/rules/${uid}/`, {
        substring, description, category, priority, is_active: isActive
    });
    return response.data;
}

export const deleteCategorizationRuleService = async (uid: string) => {
    const response = await axiosInstance.delete(`/rules/${uid}/`);
    return response.data;
}

export const listMCRService = async () => {
    const response = await axiosInstance.get(`/mcrs/`);
    return response.data;
}

export const updateMCRService = async (uid: string, transaction: string, narration: string, status: string) => {
    const response = await axiosInstance.put(`/mcrs/${uid}/`, { transaction, narration, status });
    return response.data;
}