import axiosClient from './axiosClient';

const categoryApi = {
    createCategory: async (currentCategory) => {
        try {
            const { data } = await axiosClient.post(`/category`, currentCategory);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllCategory: async (param) => {
        try {
            const { data } = await axiosClient.get('/category', { params: param });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateCategory: async (currentCategory) => {
        try {
            // chưa dùng query-string
            const { data } = await axiosClient.patch(`/category/${currentCategory.id}`, currentCategory);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    deleteCategory: async (id) => {
        try {
            // chưa dùng query-string
            const { data } = await axiosClient.delete(`/category/${id}`);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default categoryApi;
