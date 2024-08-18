import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosClient} from "../../api/axios"
import { favoriteBookApi } from '../../api/favoriteBookApi';



export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await favoriteBookApi.getBooks(user_id);
            if(response.status === 200){
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addBook = createAsyncThunk(
    "books/addbook",
    async ({user_id,book_id},{rejectWithValue}) => {
        try {
            const response = await favoriteBookApi.insertBook(user_id,book_id)
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteBook = createAsyncThunk(
    "books/deletebook",
    async ({user_id,item},{rejectWithValue}) => {
        const book_id = item?.id;
        try {
            const response = await favoriteBookApi.deleteBook(user_id,book_id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const favoriteBooksSlice = createSlice({
    name: 'favoriteBooks',
    initialState: {
        books: localStorage.getItem("favBooks") ? JSON.parse(localStorage.getItem("favBooks")) : [],
    },

    reducers : {
        handleAddToFavorite : (state,action) => {
            state.books = [...state.books,action.payload];
            localStorage.setItem("favBooks",JSON.stringify(state.books));
        },
        handleRemoveFromFavorite : (state,action) => {
            state.books = state.books.filter((book) => book.id != action.payload.id);
            localStorage.setItem("favBooks",JSON.stringify(state.books));
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getBooks.fulfilled, (state, action) => {
            state.books = action.payload;
            localStorage.setItem("favBooks", JSON.stringify(state.books));
        })
        .addCase(addBook.rejected, (state, action) => {
            const failedBook = action.meta.arg;
            state.books = state.books.filter(book => book.id !== failedBook.book_id);
            localStorage.setItem("favBooks", JSON.stringify(state.books));
        })
        .addCase(deleteBook.rejected,(state,action) => {
            const failedBook = action.meta.arg;
            state.books = [...state.books, failedBook.item];
            localStorage.setItem("favBooks", JSON.stringify(state.books));
        })
    },
});

export const { handleAddToFavorite,handleRemoveFromFavorite } = favoriteBooksSlice.actions;

export default favoriteBooksSlice.reducer;

