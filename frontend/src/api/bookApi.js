import { axiosClient } from "./axios";

export const bookAPi = {
    getBooks : () => axiosClient.get("/api/books"),
    insertBook : (data) => axiosClient.post("/api/books",data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    updateBook : (id,data) => axiosClient.post(`/api/books/${id}`,data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    deleteBook : (id) => axiosClient.delete(`/api/books/${id}`),
}
