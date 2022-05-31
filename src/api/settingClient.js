import axiosClient from './axiosClient';

const settingApi = {
    createUnit: async currentUnit => {
        try {
            const { data } = await axiosClient.post(
                '/setting/unit',
                currentUnit
            );
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    getAllUnit: async () => {
        try {
            const { data } = await axiosClient.get(`/setting/unit`);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    updateUnit: async currentUnit => {
        try {
            // chưa dùng query-string
            const { data } = await axiosClient.patch(
                `/setting/unit/${currentUnit.id}`,
                currentUnit
            );

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
};

export default settingApi;
