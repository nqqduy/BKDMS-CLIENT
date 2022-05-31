import axiosClient from './axiosClient';

const productLineApi = {
    createProductLine: async (currentCategory) => {
        try {
            const { data } = await axiosClient.post(`/productLine`, currentCategory);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllProductLine: async (param) => {
        try {
            const { data } = await axiosClient.get('/productLine', { params: param });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateProductLine: async (current) => {
        try {
            const { data } = await axiosClient.patch(`/productLine/${current.id}`, current);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    //deleteProductLine
    deleteProductLine: async (current) => {
        try {
            const { data } = await axiosClient.delete(`/productLine/${current}`, current);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default productLineApi;
