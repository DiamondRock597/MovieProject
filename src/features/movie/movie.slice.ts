import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from 'models/movie';
import { fetchMovies } from './movie.actions';

export interface MovieState {
  items: Array<Movie>;
  page: number;
  pageSize: number;
  order: string;
  isLoading: boolean;
}

const initialState: MovieState = {
  items: [],
  page: 0,
  pageSize: 10,
  isLoading: false,
  order: 'ASC'
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled.type]: (state, { payload }: PayloadAction<Omit<MovieState, 'isLoading'>>) => {
      state.items = payload.page === 1 ? payload.items : [...state.items, ...payload.items];
      state.page = payload.page;
      state.order = payload.order;
      state.isLoading = false;
    },
    [fetchMovies.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchMovies.rejected.type]: (state) => {
      state.items = [];
      state.page = 0;
      state.isLoading = false;
    }
  }
});
