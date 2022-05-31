import axiosClient from './axiosClient';

const agencyApi = {
    createAgency: async (currentAgency) => {
        try {
            const { data } = await axiosClient.post(`/agency`, currentAgency);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },

    updateAgency: async (currentAgency) => {
        try {
            const { data } = await axiosClient.patch(`/agency/${currentAgency.id}`, currentAgency);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    lockAccount: async (currentAgency) => {
        try {
            const { data } = await axiosClient.post(`/agency/lock-account`, currentAgency);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    unLockAccount: async (currentAgency) => {
        try {
            const { data } = await axiosClient.post(`/agency/unLock-account`, currentAgency);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    //lockAccount;unLockAccount;
    getAgenciesInMap: async (params) => {
        try {
            // let url = '';
            // if (params) url = `/agency?province=${params.provinceSearch}&district=${params.districtSearch}`;
            // else {
            //     url = '/agency';
            // }
            const { data } = await axiosClient.get(`/agency`, {
                params: params,
            });
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },

    getAllOrderDebtPayment: async (params) => {
        try {
            const { data } = await axiosClient.post(`/agency/all-order-debt-payment`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },

    getAgency: async (params) => {
        try {
            const { data } = await axiosClient.post(`/agency/get-agency-by-id`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },
    //getAllOrderDebtPayment

    // getAgencyOrderToExport: async (params) => {
    //     try {
    //         let url = '';
    //         const { data } = await axiosClient.get('/agency/get-agency-and-order-to-export');
    //         return data.data;
    //     } catch (error) {
    //         if (error.response) throw new Error(error.response.data.message);
    //         else throw new Error('Đã có lỗi gì đó xảy ra');
    //     }
    // },
};

export default agencyApi;
