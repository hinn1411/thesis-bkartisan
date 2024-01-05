import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true,
})