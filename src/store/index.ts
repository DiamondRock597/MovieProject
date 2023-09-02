import { configureStore } from '@reduxjs/toolkit';

import { loadTokenFromStorage } from 'features/auth/auth.actions';
import { authSlice } from 'features/auth/auth.slice';

export const initStore = async () => {
    const store = configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer
        }
    });

    await store.dispatch(loadTokenFromStorage());

    return store;
}

export type RootStore = Awaited<ReturnType<typeof initStore>>;
export type RootState = ReturnType<RootStore['getState']>;
