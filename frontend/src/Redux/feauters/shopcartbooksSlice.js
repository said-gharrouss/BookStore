import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    books : localStorage.getItem("shopingCart") ? JSON.parse(localStorage.getItem("shopingCart")) : [],
}

const shopCartBooksSlice = createSlice({
    name : "shopingcart",
    initialState,
    reducers : {
        handleAddBookToCart : (state,action) => {
            state.books = [...state.books,{item : action.payload.item,quantity : 1}];
            localStorage.setItem("shopingCart",JSON.stringify(state.books));
        },
        handleRemoveBookFromCart : (state,action) => {
            state.books = state.books.filter(item => item.item.id != action.payload.id)
            localStorage.setItem("shopingCart",JSON.stringify(state.books));
        },

        handleQuantityIncrement : (state,action) => {
            state.books.map((item) =>{
                if(item.item.id == action.payload.id){
                    return item.quantity += 1;
                }
            })
            localStorage.setItem("shopingCart",JSON.stringify(state.books));
        },

        handleQuantityDecrement : (state,action) => {
            state.books.map((item) =>{
                if(item.item.id == action.payload.id){
                    return item.quantity -= 1;
                }
            })
            localStorage.setItem("shopingCart",JSON.stringify(state.books));
        },

        handleClearBooks : (state) => {
            state.books = [];
            localStorage.setItem("shopingCart",JSON.stringify(state.books));
        }
    }

})

export const {handleAddBookToCart,handleRemoveBookFromCart,handleQuantityIncrement,handleQuantityDecrement,handleClearBooks} = shopCartBooksSlice.actions;

export default shopCartBooksSlice.reducer;

