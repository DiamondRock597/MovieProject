import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKeys, memory } from 'api/memory';
import { http } from 'api/http';

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserRegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const loadTokenFromStorage = createAsyncThunk('user/loadToken', async () => {
  const token = await memory.load<string>(StorageKeys.AccessToken);

  http.addHeader('Authorization', `Bearer ${token}`);

  return token || '';
});

export const login = createAsyncThunk('user/login', async (payload: UserLoginParams) => {
  const response = await http.post<{ token: string }>('sessions', { params: payload });

  http.addHeader('Authorization', `Bearer ${response.token}`);

  return response.token;
});

export const register = createAsyncThunk('user/register', async (payload: UserRegisterParams) => {
  const response = await http.post<{ token: string }>('users', { params: payload });

  http.addHeader('Authorization', `Bearer ${response.token}`);

  return "token";
});
