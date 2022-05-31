import axiosClient from './axiosClient';

const productApi = {
    createProduct: async (currentProduct) => {
        try {
            const { data } = await axiosClient.post(`/product`, currentProduct);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateProduct: async (currentProduct) => {
        try {
            const { data } = await axiosClient.patch(`/product/${currentProduct.id}`, currentProduct);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    deleteProduct: async (id) => {
        try {
            const { data } = await axiosClient.delete(`/product/${id}`);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    //deleteProduct
    //updateProduct
    getAllProduct: async (param) => {
        try {
            const { data } = await axiosClient.get('/product', {
                params: param,
            });
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getListProductToExport: async (params) => {
        try {
            const { data } = await axiosClient.post(`/product/get-list-product-to-export`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default productApi;
