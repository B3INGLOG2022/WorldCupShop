import { configureStore } from "@reduxjs/toolkit"
import {authSlice} from "../slices/auth_slice"
import {cartSlice} from "../slices/cart_slice"


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
    }
})
