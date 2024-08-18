import { axiosClient } from "./axios";

export const favoriteBookApi = {
    getBooks : (user_id) => axiosClient.get(`/api/favorites?user_id=${user_id}`),
    insertBook : (user_id,book_id) => axiosClient.post("/api/favorites",{user_id,book_id}),
    deleteBook : (user_id,book_id) => axiosClient.delete(`api/favorites/${user_id}/${book_id}`)
}
