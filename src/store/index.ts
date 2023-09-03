import {configureStore} from '@reduxjs/toolkit';

import {loadTokenFromStorage} from 'features/user/user.actions';
import {movieSlice} from 'features/movie/movie.slice';
import {userSlice} from 'features/user/user.slice';

export const initStore = async () => {
  const store = configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [movieSlice.name]: movieSlice.reducer,
    },
  });

  await store.dispatch(loadTokenFromStorage());

  return store;
};

export type RootStore = Awaited<ReturnType<typeof initStore>>;
export type RootState = ReturnType<RootStore['getState']>;
