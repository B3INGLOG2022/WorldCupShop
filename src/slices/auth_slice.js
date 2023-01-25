
import { createSlice } from "@reduxjs/toolkit"

const initialAuth = {
    lastName: localStorage.getItem("last_name"),
    firstName: localStorage.getItem("first_name"), 
    email:localStorage.getItem("email"), 
    token:localStorage.getItem("access_token"), 
    refreshToken:localStorage.getItem("refresh_token"),   
    cstmrId:localStorage.getItem("cstmr_id"), 
    admToken:localStorage.getItem("adm_token"),
}

export const authSlice = createSlice(
    {
        name:"auth",
        initialState:  initialAuth,
        reducers: {
            login: (state, action) => {
                state.lastName = action.payload.last_name;
                state.firstName = action.payload.first_name;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh;
                state.cstmrId = action.payload.cstmr_id;
                localStorage.setItem("last_name", action.payload.last_name);
                localStorage.setItem("first_name", action.payload.first_name);
                localStorage.setItem("email", action.payload.email);
                localStorage.setItem("access_token", action.payload.token);
                localStorage.setItem("refresh_token", action.payload.refresh);
                localStorage.setItem("cstmr_id", action.payload.cstmr_id);
                return state;   
            },
            logout: (state, action) => {
                state.lastName = null;
                state.firstName = null;
                state.email = null;
                state.token=null;
                state.refreshToken=null;
                state.cstmrId = null;
                localStorage.removeItem("last_name");
                localStorage.removeItem("first_name");
                localStorage.removeItem("email");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("cstmr_id");
                return state;   
            },
            refresh: (state, action) => {
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh;
                localStorage.setItem("access_token", action.payload.token);
                localStorage.setItem("refresh_token", action.payload.refresh);
                return state;
            },
            refresh_admin: (state, action) => {
                state.admToken = action.payload.adm_token;
                localStorage.setItem("adm_token", action.payload.adm_token);
                return state;
            },
        }
    }
);


export const {
    login,
    logout,
    refresh,
    refresh_admin,
    load_adm
} = authSlice.actions