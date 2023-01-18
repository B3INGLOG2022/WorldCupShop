
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialAuth = {
    lastName: localStorage.getItem("last_name")||'',
    firstName: localStorage.getItem("first_name")||'',
    email:localStorage.getItem("email")||'',
    token:localStorage.getItem("access_token")||'',
    refreshToken:localStorage.getItem("refresh_token")||'',    
    admToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MjM4YzgxLTZmNzItNDZjYS05YTcyLTZkMDEyOGMwOWFlZCIsInJvbGUiOiIzOWVmNzFjYy1lNzFmLTQzODEtYWM3Ni0zM2UwNDFhMDY3ZDEiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3NDAwMjY4MywiZXhwIjoxNjc0MDAzNTgzLCJpc3MiOiJkaXJlY3R1cyJ9.8uzr9x2GZnrGlj-J_CYSqG0T4OSiPwIEO5Qqid7sZRE',
    cstmrId:localStorage.getItem("cstmrId")||'',
}

// aide pour générer un admToken pour directus :
// curl --location --request POST 'http://127.0.0.1:8055/auth/login' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "email": "admin@example.com",
//     "password": "password"
// }'

export const authSlice = createSlice(
    {
        name:"auth",
        initialState: (initialAuth?.token !== '')
        ? { isLoggedIn: true, initialAuth}
        : { isLoggedIn: false, initialAuth},
        reducers: {
            login: (state, action) => {
                console.log("login ok")
                state.lastName = action.payload.last_name;
                state.firstName = action.payload.first_name;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refresh;
                state.cstmrId = action.payload.cstmr_id;
                state.isLoggedIn = true;
                window.localStorage.setItem("last_name", action.payload.last_name);
                window.localStorage.setItem("first_name", action.payload.first_name);
                window.localStorage.setItem("email", action.payload.email);
                window.localStorage.setItem("access_token", action.payload.token);
                window.localStorage.setItem("refresh_token", action.payload.refresh);
                window.localStorage.setItem("cstmr_id", action.payload.id_customer);
                return state;   
            },
            logout: (state, action) => {
                console.log("logout ok")
                state.lastName = '';
                state.firstName = '';
                state.email = '';
                state.token='';
                state.refreshToken='';
                state.isLoggedIn=false;
                localStorage.removeItem("last_name");
                localStorage.removeItem("first_name");
                localStorage.removeItem("email");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("id_customer");
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
            refresh_admin: async (state, action) => {
                console.log("refresh ok")
                await axios
                    .post(process.env.REACT_APP_DIRECTUS_URL+'auth/refresh',
                    JSON.stringify({
                        email: "admin@example.com",
                        password: "password"
                    }),{
                        "headers": {
                        "Content-Type": "application/json"
                    }}).then((res) => {
                        state.admToken = res?.data?.access_token;
                        state.admRefreshToken = res?.data?.refresh_token;
                    })
                return state;
            },
        }
    }
);


export const {
    login,
    logout,
    refresh
} = authSlice.actions