import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "api/http";
import { Movie } from "models/movie";
// import { RootState } from "store";

export interface FetchMoviesParams {
    actor?: string;
    title?: string;
    search?: string;
    order?: string;
    page: number;
}

//<{ items: Array<Movie>, page: number }, FetchMoviesParams, { state: RootState }>

export const fetchMovies = createAsyncThunk('movie/fetch', async (params: FetchMoviesParams, { getState }) => {
    const { pageSize } = getState().movie;
    const response = await http.get<Array<Movie>>('movies', {
        params: {
            limit: pageSize,
            offset: params.page,
            actor: params.actor,
            title: params.actor,
            search: params.search,
            order: params.order
        }
    });

    return { items: response, page: params.page }
});