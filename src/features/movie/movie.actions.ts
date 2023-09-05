import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "api/http";
import { Movie, MovieFormats } from "models/movie";
export interface FetchMoviesParams {
    actor?: string;
    title?: string;
    search?: string;
    order?: string;
    offset: number;
}

export interface CreateMoviesParams {
    name: string;
    year: number;
    actors: Array<string>;
    format: MovieFormats;
}
export const MOVIES_LIMIT = 8;

export const fetchMovies = createAsyncThunk('movie/list', async (params: FetchMoviesParams) => {
    const response = await http.get<Array<Movie>>('/movies', {
        params: {
            limit: MOVIES_LIMIT,
            offset: params.offset,
            actor: params.actor,
            title: params.actor,
            search: params.search,
            order: params.order
        }
    });

    return { items: response?.data, offset: params.offset }
});

export const fetchMovie = createAsyncThunk('movie/details', async (movieId: number) => {
    const response = await http.get<Required<Movie>>(`/movies/${movieId}`);

    return response?.data;
});

export const deleteMovie = createAsyncThunk('movie/delete', async (movieId: number) => {
    const response = await http.delete(`/movies/${movieId}`);

    return response.status;
});

export const createMovie = createAsyncThunk('movie/create', async (payload: CreateMoviesParams, { rejectWithValue }) => {
    const response = await http.post<Movie>('/movies', {
        title: payload.name,
        year: Number(payload.year),
        actors: payload.actors,
        format: payload.format
    });

    return response.data;
});