import { createSlice } from "@reduxjs/toolkit"

const initialCart = {
    cartPrice:0,
    listItems:[]
}

export const cartSlice = createSlice(
    {
        name:"cart",
        initialState:initialCart,
        reducers: {
            addItem: (state, action) => {
                if (!(state.listItems.find(item => item.id === action.payload.id))) {
                    state.listItems.push({id:action.payload.id, name:action.payload.name, img: action.payload.img, price:action.payload.price, stock:action.payload.stock, size:action.payload.size})
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
                if (state.listItems.find(item => item.id === action.payload.id)) {
                    const newList = state.listItems.filter((item) => item.id !== action.payload.id);
                    state.listItems = newList;
                    let sum = 0;
                    state.listItems.map((item) => {
                        sum += Number((item.price*item.stock).toFixed(2));
                    })
                    state.cartPrice = Number(sum.toFixed(2));
                }
                return state;   
            },
            emptyCart:(state, action) => {
                state.cartPrice = 0;
                state.listItems = [];
            }
        }
    }
);

export const {
    addItem,
    addItemStock,
    removeItemStock,
    deleteItem,
    emptyCart
} = cartSlice.actions