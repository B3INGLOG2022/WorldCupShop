
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialAuth = {
    lastName: localStorage.getItem("last_name"),
    firstName: localStorage.getItem("first_name"),
    email:localStorage.getItem("email"),
    token:localStorage.getItem("access_token"),
    refreshToken:localStorage.getItem("refresh_token"),    
    cstmrId:localStorage.getItem("cstmr_id"),
    admToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MjM4YzgxLTZmNzItNDZjYS05YTcyLTZkMDEyOGMwOWFlZCIsInJvbGUiOiIzOWVmNzFjYy1lNzFmLTQzODEtYWM3Ni0zM2UwNDFhMDY3ZDEiLCJhcHBfYWNjZXNzIjoxLCJhZG1pbl9hY2Nlc3MiOjEsImlhdCI6MTY3NDEzMzIyMCwiZXhwIjoxNjc0MTM0MTIwLCJpc3MiOiJkaXJlY3R1cyJ9.yfKvQD0sJ1g89Pw_ZyQ2CkifLxBYApu7_bAmjsBxsVk',
}

export const authSlice = createSlice(
    {
        name:"auth",
        initialState:  initialAuth,
        reducers: {
            login: (state, action) => {
                console.log("login ok")
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
                console.log("logout ok")
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
                    .post(process.env.REACT_APP_DIRECTUS_URL+'auth/login',
                    JSON.stringify({
                        email: "admin@example.com",
                        password: "password"
                    }),{
                        "headers": {
                        "Content-Type": "application/json"
                    }}).then((res) => {
                        state.admToken = res?.data?.access_token;
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