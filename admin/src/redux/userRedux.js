import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSucces: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
})


export const { loginStart, loginSucces, loginFailure, logout } = userSlice.actions

export default userSlice.reducer