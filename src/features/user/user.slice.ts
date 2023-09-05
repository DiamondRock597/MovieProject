import { createSlice } from '@reduxjs/toolkit';

import { loadTokenFromStorage, login, logout, register } from './user.actions';
import { memory } from 'api/memory';

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
  reducers: {  },
  extraReducers: {
    [loadTokenFromStorage.fulfilled.type]: (state, { payload }) => {
      state.token = payload;
    },
    [login.pending.type]: state => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, { payload }) => {
      state.token = payload;
      state.loading = false;
    },
    [register.pending.type]: state => {
      state.loading = true;
    },
    [register.fulfilled.type]: (state, { payload }) => {
      state.token = payload;
      state.loading = false;
    },
    [logout.fulfilled.type]: (state) => {
      state.token = '';
    }
  },
});
