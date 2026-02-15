import axiosInstance from "./base";

export const getDastboardAnalyticsService = async () => {
    const response = await axiosInstance.get('/analytics/dashboard');
    return response.data;
}