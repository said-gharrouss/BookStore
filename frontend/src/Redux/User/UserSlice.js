import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userDetailApi } from "../../api/userDetailApi";
import { userApi } from "../../api/userApi";
import { axiosClient } from "../../api/axios";


export const getDetails = createAsyncThunk(
    "user/getDetails",
    async (user_id, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        if (token) {
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        try {
            const response = await userDetailApi.getDetails(user_id);
            if(response.status === 200){
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getInfos = createAsyncThunk(
    "user/getInfos",
    async (_,{rejectWithValue}) => {
        try {
            const response = await userApi.userInfos();
            if(response.status === 200){
                const id = response.data.id;
                const name = response.data.name;
                const email = response.data.email;
                return {id,name,email};
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    infos : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    isAuthenticated : localStorage.getItem("isAuthenticated") ? localStorage.getItem("isAuthenticated") === "true" : false,
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    role : localStorage.getItem("role") ? localStorage.getItem("role") : null,
    details : localStorage.getItem("details") ? JSON.parse(localStorage.getItem("details")) : {},
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
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
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDetails.fulfilled, (state, action) => {
            state.details = action.payload;
            localStorage.setItem("details", JSON.stringify(state.details));
        })
        .addCase(getInfos.fulfilled,(state, action) => {
            state.infos = action.payload;
            localStorage.setItem("user",JSON.stringify(state.infos));
        })
    },
})

export const {handleUserInfos,handleAuthenticated,handleToken,handleRole} = userSlice.actions;
export default userSlice.reducer;
