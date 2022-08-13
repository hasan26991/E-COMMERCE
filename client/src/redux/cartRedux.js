import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    total: 0,
    quantity: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.quantity * action.payload.price
        },
    },
})


export const { addProduct } = cartSlice.actions

export default cartSlice.reducer