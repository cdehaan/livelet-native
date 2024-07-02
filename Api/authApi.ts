import { LoginCredentialsType } from "@/types";
import axiosClient from "./axiosClient";

export const authApi = {
    login: (params: LoginCredentialsType) => {
        const url = "/api/login";
        return axiosClient.post(url, params);
    }
};