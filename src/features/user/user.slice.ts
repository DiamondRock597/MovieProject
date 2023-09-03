import {createSlice} from '@reduxjs/toolkit';

import {loadTokenFromStorage, login, register} from './user.actions';

export interface UserState {
  token: string;
  loading: boolean;
}

const initialState: UserState = {
  token: '',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.token = '';
    },
  },
  extraReducers: {
    [loadTokenFromStorage.fulfilled.type]: (state, {payload}) => {
      state.token = payload;
    },
    [login.pending.type]: state => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, {payload}) => {
      state.token = payload;
      state.loading = false;
    },
    [register.pending.type]: state => {
      state.loading = true;
    },
    [register.fulfilled.type]: (state, {payload}) => {
      state.token = payload;
      state.loading = false;
    },
  },
});

export const {logout} = userSlice.actions;
