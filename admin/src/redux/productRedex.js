import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    isFetching: false,
    error: false,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductStart: (state) => {
            state.isFetching = true;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = state.products.filter((product) => {
                return product._id !== action.payload;
            })
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateProductStart: (state) => {
            state.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex(p => p._id === action.payload.id)] = action.payload.product;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //ADD
        addProductStart: (state) => {
            state.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
})


export const { loginStart, loginSucces, loginFailure,
    getProductStart, getProductSuccess, getProductFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure } = productSlice.actions

export default productSlice.reducer