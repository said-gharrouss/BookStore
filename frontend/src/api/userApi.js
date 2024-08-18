import { axiosClient } from "./axios";

export const userApi = {
    login : (data) =>  axiosClient.post("/login", data),
    logout : () => axiosClient.post("/logout"),
    userInfos : () =>  axiosClient.get("api/user"),
    csrfToken : () => axiosClient.get("/sanctum/csrf-cookie"),
    register : (data) =>  axiosClient.post("/register",data),
}
