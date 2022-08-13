import { loginFailure, loginStart, loginSucces } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"
import {
    addProductFailure, addProductStart, addProductSuccess,
    deleteProductFailure, deleteProductStart, deleteProductSuccess,
    getProductFailure, getProductStart, getProductSuccess,
    updateProductFailure, updateProductStart, updateProductSuccess
} from "./productRedex";

export const LOGIN = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('auth/login', user);
        dispatch(loginSucces(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}
//get Products
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get('/products');
        dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}
//delete product
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try {
        // await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatch(deleteProductFailure());
    }
}
//update product
export const updateProduct = async (dispatch, { id, product }) => {
    dispatch(updateProductStart());
    try {
        // update api
        dispatch(updateProductSuccess({ id, product }))
    } catch (err) {
        dispatch(updateProductFailure());
    }
}
//add product
export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post('products/', product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
}