import axiosClient from './axiosClient';

const orderApi = {
    createOrder: async (current) => {
        try {
            const { data } = await axiosClient.post(`/order/create-by-supplier`, current);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    deleteOrder: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/delete-order`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllOrder: async (current) => {
        try {
            const { data } = await axiosClient.get(`/order`, {
                params: current,
            });
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getOrderByOrderCode: async (orderCode) => {
        try {
            const { data } = await axiosClient.get(`/order/${orderCode}`);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getOrderToExport: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/get-order-to-export`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    approveOrder: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/approve-order`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    paymentOrder: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/payment-order`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    cancelOrder: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/cancel-order-by-supplier`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getOrderWithChart: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/get-order-with-chart`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    reportDebt: async (params) => {
        try {
            const { data } = await axiosClient.post(`/order/report-debt`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    //reportDebt
};

export default orderApi;
