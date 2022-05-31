import axiosClient from './axiosClient';

const deliveryApi = {
    configDelivery: async (params) => {
        try {
            const { data } = await axiosClient.post(`delivery/config-delivery-and-export`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default deliveryApi;
