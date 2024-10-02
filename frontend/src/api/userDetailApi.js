import { axiosClient } from "./axios";


export const userDetailApi = {
    getDetails : (user_id) => axiosClient.get(`api/userdetail?user_id=${user_id}`),
    getPersonalInfo : (user_id) => axiosClient.get(`/api/profile?user_id=${user_id}`),
    insertDetails : (data) => axiosClient.post('api/userdetail',data),
    updateDetails : (id,data) => axiosClient.put(`api/userdetail/${id}`,data),
    updatePersonalInfo : (id,data) => axiosClient.put(`api/profile/${id}`,data),
}
