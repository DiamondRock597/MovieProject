import { createSlice } from "@reduxjs/toolkit";

import { Movie } from "models/movie";

export interface MovieState {
    items: Array<Movie>
    page: number;
    pageSize: number;
}

const initialState: MovieState = {
    items: [],
    page: 0,
    pageSize: 10
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {}
});