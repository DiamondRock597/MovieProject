import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from 'models/movie';
import { deleteMovie, fetchMovie, fetchMovies } from './movie.actions';

export interface MovieState {
  items: Array<Movie>;
  offset: number;
  isLoading: boolean;
  selectedMovie: Required<Movie> | null;
}

const initialState: MovieState = {
  items: [],
  offset: 0,
  isLoading: false,
  selectedMovie: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    }
  },
  extraReducers: {
    [fetchMovies.fulfilled.type]: (state, { payload }: PayloadAction<Omit<MovieState, 'isLoading'>>) => {
      state.items = payload.offset === 0 ? payload.items : [...state.items, ...payload.items];
      state.offset = payload.offset;
      state.isLoading = false;
    },
    [fetchMovies.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchMovies.rejected.type]: (state) => {
      state.items = [];
      state.offset = 0;
      state.isLoading = false;
    },
    [fetchMovie.fulfilled.type]: (state, { payload }) => {
      state.selectedMovie = payload;
      state.isLoading = false;
    },
    [fetchMovie.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchMovie.rejected.type]: (state) => {
      state.selectedMovie = null;
    },
    [deleteMovie.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.selectedMovie = null;
    },
    [deleteMovie.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteMovie.rejected.type]: (state) => {
      state.isLoading = false;
      state.selectedMovie = null;
    },
  }
});


export const { clearSelectedMovie } = movieSlice.actions;