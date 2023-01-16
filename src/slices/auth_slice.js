
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialAuth = {
    email:localStorage.getItem("email")||'',
    token:localStorage.getItem("access_token")||'',
    refreshToken:localStorage.getItem("refresh_token")||'',
    cart:localStorage.getItem("cart")||'',
    idCustomer:localStorage.getItem("id_customer")||'',
}

export const authSlice = createSlice(
    {
        name:"auth",
        initialState: (initialAuth?.token !== '')
        ? { isLoggedIn: true, initialAuth}
        : { isLoggedIn: false, initialAuth},
        reducers: {
            signup: (state, action) => {
                console.log("signup ok")
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh;
                state.isLoggedIn = true;
                window.localStorage.setItem("access_token", action.payload.token);
                window.localStorage.setItem("refresh_token", action.payload.refresh);
                return state;   
            },
            login: (state, action) => {
                console.log("login ok")
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh;
                state.isLoggedIn = true;
                window.localStorage.setItem("access_token", action.payload.token);
                window.localStorage.setItem("refresh_token", action.payload.refresh);
                return state;   
            },
            logout: (state, action) => {
                console.log("logout ok")
                state.email = '';
                state.token='';
                state.refreshToken='';
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                state.isLoggedIn=false;
                return state;   
            },
            refresh: async (state, action) => {
                console.log("refresh ok")
                await axios
                    .post(process.env.REACT_APP_DIRECTUS_URL+'auth/refresh',
                    JSON.stringify({
                    refresh_token:state.refreshToken,
                    mode:'json'
                    }),{
                    "headers": {
                    "Content-Type": "application/json"
                    }}).then((res) => {
                        state.token = res?.data?.access_token;
                        state.refreshToken = res?.data?.refresh_token;
                    })
                return state;
            },
        }
    }
);


export const {
    signup,
    login,
    logout,
    refresh
} = authSlice.actions