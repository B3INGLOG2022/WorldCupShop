import { createSlice, configureStore } from "@reduxjs/toolkit"

const cart = {
    cartPrice:0,
    listItems:[]
}

const cartSlice = createSlice(
    {
        name:"cart",
        initialState:cart,
        reducers: {
            changeCartValue: (state, action) => {
                return action.payload
            },
            addItem: (state, action) => {
                if (!(state.listItems.find(item => item.id === action.payload.id))) {
                    state.listItems.push({id:action.payload.id, price:action.payload.price, stock:action.payload.stock})
                    let sum = 0;
                    state.listItems.map((item) => {
                        sum += Number((item.price*item.stock).toFixed(2));
                    })
                    state.cartPrice = Number(sum.toFixed(2));
                }
                return state;   
            },
            addItemStock: (state, action) => {
                state.listItems.find(item => item.id === action.payload.id).stock += 1;
                let sum = 0;
                state.listItems.map((item) => {
                    sum += Number((item.price*item.stock).toFixed(2));
                })
                state.cartPrice = Number(sum.toFixed(2));
                return state;   
            },
            removeItemStock: (state, action) => {
                state.listItems.find(item => item.id === action.payload.id).stock -= 1;
                let sum = 0;
                state.listItems.map((item) => {
                    sum += Number((item.price*item.stock).toFixed(2));
                })
                state.cartPrice = Number(sum.toFixed(2));
                return state;
            },
            deleteItem: (state, action) => {
                state = state.filter((t) => t.id !== action.payload )
                let sum = 0;
                state.listItems.map((item) => {
                    sum+= Number((item.price*item.stock).toFixed(2));
                })
                state.cartPrice = Number(sum.toFixed(2));
                return state;   
            },
        }
    }
);


export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    }
})

export const {
    changeCartValue,
    addItem,
    addItemStock,
    removeItemStock,
    deleteItem
} = cartSlice.actions