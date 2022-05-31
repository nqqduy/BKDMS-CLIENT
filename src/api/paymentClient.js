import axiosClient from './axiosClient';

const paymentApi = {
    codPayment: async (params) => {
        try {
            const { data } = await axiosClient.post(`/payment`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllPaymentByAgency: async (param) => {
        try {
            const { data } = await axiosClient.post('/payment/get-all-payment-agency', param);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default paymentApi;
