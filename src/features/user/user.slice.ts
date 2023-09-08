import { createSlice } from '@reduxjs/toolkit';

import { loadTokenFromStorage, login, logout, register } from './user.actions';

export interface UserState {
  token: string;
}

const initialState: UserState = {
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTokenFromStorage.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = '';
      })
  },
});