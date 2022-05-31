import axiosClient from './axiosClient';

const shipperApi = {
    getListOrderToShipper: async (params) => {
        try {
            const { data } = await axiosClient.post('/order/get-list-order-to-shipper', params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
};

export default shipperApi;
