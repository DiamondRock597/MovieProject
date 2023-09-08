import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKeys, memory } from 'api/memory';
import { http } from 'api/http';
import { ErrorCodes } from 'constants/errorCodes';
import { Alert } from 'react-native';

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

  if (!token) {
    return '';
  }

  http.addHeader('Authorization', token);

  return token;
});

export const logout = createAsyncThunk('user/logout', async () => {
  http.cleanHeaders();
  await memory.remove(StorageKeys.AccessToken);
});

export const login = createAsyncThunk('user/login', async ({ email, password }: UserLoginParams) => {
  const response = await http.post('/sessions', { email, password });
  
  if (response.error?.code === ErrorCodes.AUTHENTICATION_FAILED) {
    Alert.alert('Ups!', 'Login failed');
    return;
  }

  if (!response.token) {
    return '';
  }

  await memory.save(StorageKeys.AccessToken, response.token);

  http.addHeader('Authorization', response.token);

  return response.token;
});

export const register = createAsyncThunk('user/register', async ({ email, password, confirmPassword, name }: UserRegisterParams) => {
  const response = await http.post('/users', { email, password, confirmPassword, name });

  if (response.error?.code === ErrorCodes.EMAIL_NOT_UNIQUE) {
    Alert.alert('Ups!', 'User already exists');
    return;
  }

  if (!response.token) {
    return '';
  }

  await memory.save(StorageKeys.AccessToken, response.token);

  http.addHeader('Authorization', response.token);

  return response.token;
});
