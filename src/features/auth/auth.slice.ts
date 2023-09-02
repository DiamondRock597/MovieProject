import { createSlice } from "@reduxjs/toolkit";

import { loadTokenFromStorage } from "./auth.actions";

export interface AuthState {
    token: string;
}

const initialState: AuthState = {
    token: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
        }
    },
    extraReducers: {
        [loadTokenFromStorage.fulfilled.type]: (state, { payload }) => {
            state.token = payload;
        }
    }
});

export const { logout } = authSlice.actions;