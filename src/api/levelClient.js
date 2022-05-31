import axiosClient from './axiosClient';

const levelApi = {
    createLevel: async (currentLevel) => {
        try {
            const { data } = await axiosClient.post(`/level`, currentLevel);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    updateLevel: async (currentLevel) => {
        try {
            const { data } = await axiosClient.post(`/level/update-level`, currentLevel);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    checkLevel: async (currentLevel) => {
        try {
            const { data } = await axiosClient.post(`/level/check-reward-level`, currentLevel);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    //updateLevel
    getAllLevel: async (param) => {
        try {
            const { data } = await axiosClient.get('/level', {
                params: param,
            });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getAllLevelOfAgency: async (param) => {
        try {
            const { data } = await axiosClient.post('/level/get-all-level-of-agency', param);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    registerLevel: async (param) => {
        try {
            const { data } = await axiosClient.post('/level/register', param);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    cancelLevel: async (param) => {
        try {
            const { data } = await axiosClient.post('/level/cancel-level', param);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    //getAllLevelOfAgency
};

export default levelApi;
