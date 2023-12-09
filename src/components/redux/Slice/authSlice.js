import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            status: false
        },
        logout: {
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.status = true;
        },
        loginFailed: (state) => {
            state.login.isFetching = true;
            state.login.error = true;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            state.login.status = false;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutFailed,
    logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;