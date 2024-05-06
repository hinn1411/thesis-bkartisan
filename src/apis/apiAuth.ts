import { axiosClient } from "./axiosClient";

const apiAuth = {
    login: async (username: string, password: string) => {
        const res = await axiosClient.post("/login", {username, password});
        return res;
    },
    register: async () => {

    },
    logout: async () => {
        const res = await axiosClient.post("/logout", null);
        return res;
    }
}

export default apiAuth;