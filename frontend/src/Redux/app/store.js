import {configureStore} from "@reduxjs/toolkit";
import favoritesSlice  from "../feauters/favoritbooksSlice";
import shopcartbooksSlice from "../feauters/shopcartbooksSlice";
import filtersSlice from "../feauters/filtersSlice";
import userSlice from "../User/UserSlice";

export const store = configureStore({
    reducer : {
        favBooks : favoritesSlice,
        shopingCart : shopcartbooksSlice,
        filters : filtersSlice,
        user : userSlice,
    }
})
