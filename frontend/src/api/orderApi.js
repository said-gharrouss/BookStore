import { axiosClient } from "./axios";


export const orderApi = {
    getOrders : () => axiosClient.get("/api/order"),
    insertOrder : (data) => axiosClient.post("/api/order",data),
    updateOrder : (id,status) => axiosClient.put(`api/order/${id}`,{status}),
}
