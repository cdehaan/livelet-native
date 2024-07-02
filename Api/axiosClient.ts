import axios, { AxiosRequestHeaders } from "axios";
const queryString = require("query-string");
//import { store, resetAuth, updateSnackBar } from "@redux";
// config axios
const API_URL = "";
const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },

    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use((config) => {
    //const token = store.getState().auth?.tokenInfoAuth;
    //const token = process.env.REACT_APP_HARD_TOKEN;
    //console.log("token: " + token);
    //config.headers = {
    //    Authorization: `Bearer ${token}`,
    //} as AxiosRequestHeaders;

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }
        return response;
    },
    (error: any) => {
        if (error.response && error.response.status === 401) {
            console.log("401 error: " + error.response?.data?.message);
            // await authApi.logout();
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
