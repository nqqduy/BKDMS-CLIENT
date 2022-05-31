import axios from 'axios';
import queryString from 'query-string';

const URL = process.env.REACT_APP_SERVER_URL;

const axiosClient = axios.create({
    baseURL: `${URL}/web/api/v1`,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// interceptors request
axiosClient.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('workspace') && localStorage.getItem('token')) {
            const workspace = localStorage.getItem('workspace');
            // let workspace = JSON.parser(user);
            const token = localStorage.getItem('token');
            config.headers.common['Authorization'] = `Bearer ${token}`;
            config.headers.common['Workspace'] = workspace;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// interceptors response
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
