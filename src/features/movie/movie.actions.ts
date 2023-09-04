import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "api/http";
import { Movie } from "models/movie";
import { Response } from "models/response";
export interface FetchMoviesParams {
    actor?: string;
    title?: string;
    search?: string;
    order?: string;
    offset: number;
}

export const MOVIES_LIMIT = 8;

export const fetchMovies = createAsyncThunk('movie/list', async (params: FetchMoviesParams) => {
    const response = await http.get<Response<Array<Movie>>>('/movies', {
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
    const response = await http.get<Response<Required<Movie>>>(`/movies/${movieId}`);

    return response?.data;
});

export const deleteMovie = createAsyncThunk('movie/delete', async (movieId: number) => {
    const response = await http.delete<Response>(`/movies/${movieId}`);

    return response.status;
})