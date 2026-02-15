import axiosInstance from "./base";

export const listAccountTypesService = async () => {
    const response = await axiosInstance.get("/accounts/types");
    return response.data;
}

export const listBanksService = async () => {
    const response = await axiosInstance.get("/accounts/banks/");
    return response.data;
}

export const listAccountsService = async () => {
    const response = await axiosInstance.get("/accounts/");
    return response.data;
}

export const createAccountService = async (
    name: string, type: string, bank_id: string, balance: number, account_no_last_digits: string
) => {
    const response = await axiosInstance.post(`/accounts/`, {
        name, type, bank: bank_id, balance, account_no_last_digits
    });
    return response.data;
}

export const updateAccountService = async (
    uid: string, name: string, type: string, bank_id: string, balance: number, account_no_last_digits: string
) => {
    const response = await axiosInstance.put(`/accounts/${uid}/`, {
        name, type, bank: bank_id, balance, account_no_last_digits
    });
    return response.data;
}