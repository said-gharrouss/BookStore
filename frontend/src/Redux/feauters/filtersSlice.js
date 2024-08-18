import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    languageFilter : "All Languages",
    categorieFilter : "All Categories",
    priceFilter : "All Prices",
}

const filtersSlice = createSlice({
    name : "filtersSlice",
    initialState,
    reducers : {
        handleLangFilter : (state,action) => {
            state.languageFilter = action.payload.sort;
        },
        handlecategFilter : (state,action) => {
            state.categorieFilter = action.payload.sort;
        },
        handlePriceFilter : (state,action) => {
            state.priceFilter = action.payload.sort;
        }
    }
})

export const {handleLangFilter,handlecategFilter,handlePriceFilter} = filtersSlice.actions

export default filtersSlice.reducer;


