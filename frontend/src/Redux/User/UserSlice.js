import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    infos : {},
    isAuthenticated : localStorage.getItem("isAuthenticated") ? localStorage.getItem("isAuthenticated") === "true" : false,
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    role : localStorage.getItem("role") ? localStorage.getItem("role") : null,
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        handleUserInfos : (state,action) => {
            state.infos = action.payload;
            localStorage.setItem("user", JSON.stringify(state.infos));
        },
        handleAuthenticated : (state,action) => {
            state.isAuthenticated = action.payload;
            localStorage.setItem("isAuthenticated",state.isAuthenticated);
        },
        handleToken : (state,action) => {
            state.token = action.payload;
            localStorage.setItem("token",state.token);
        },
        handleRole : (state,action) => {
            state.role = action.payload;
            localStorage.setItem("role",state.role);
        }
    }
})

export const {handleUserInfos,handleAuthenticated,handleToken,handleRole} = userSlice.actions;
export default userSlice.reducer;
