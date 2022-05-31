import axios from 'axios';
import axiosClient from './axiosClient';

const URL = process.env.REACT_APP_SERVER_URL;

const userApi = {
    registerTenant: async (currentTenant) => {
        try {
            const { data } = await axios.post(`${URL}/api/v1/auth/register`, currentTenant);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi gì đó xảy ra');
        }
    },

    loginUser: async (currentUser) => {
        try {
            const { data } = await axios.post(`${URL}/api/v1/auth/login`, currentUser);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    createEmployee: async (params) => {
        try {
            // ?shipper=${params}
            const { data } = await axiosClient.post(`/employee`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    deleteEmployee: async (params) => {
        try {
            // ?shipper=${params}
            const { data } = await axiosClient.post(`/employee/delete-employee`, params);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    updateEmployee: async (params) => {
        try {
            // ?shipper=${params}
            const { data } = await axiosClient.post(`/employee/update-employee`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    updateTenant: async (params) => {
        try {
            // ?shipper=${params}
            const { data } = await axiosClient.post(`/employee/update-tenant`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    // /updateTenant
    //updateEmployee
    getAllEmployee: async (params) => {
        try {
            // ?shipper=${params}
            const { data } = await axiosClient.get(`/employee`, { params: params });
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },

    forgotPassword: async (params) => {
        try {
            const { data } = await axiosClient.post(`/changeInfo/forgetPassword`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
    resetPassword: async (params) => {
        try {
            const { data } = await axiosClient.post(`/changeInfo/resetPassword`, params);
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error(error.message);
        }
    },
};

export default userApi;
