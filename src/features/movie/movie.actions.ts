import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentPickerAsset } from "expo-document-picker";

import { SearchMethod, searchMethodKey } from "constants/searchMethod";
import { Movie, MovieFormats } from "models/movie";
import { http } from "api/http";
import { Alert } from "react-native";
import { ErrorCodes } from "constants/errorCodes";

export interface FetchMoviesParams {
    order?: string;
    offset: number;
    searchValue?: string;
    searchMethod?: SearchMethod;
}

export interface CreateMoviesParams {
    name: string;
    year: number;
    actors: Array<string>;
    format: MovieFormats;
}
export const MOVIES_LIMIT = 8;

export const fetchMovies = createAsyncThunk('movie/list', async (params: FetchMoviesParams) => {
    const searchKey = searchMethodKey[params.searchMethod ?? SearchMethod.Title];

    const response = await http.get<Array<Movie>>('/movies', {
        params: {
            [searchKey]: params.searchValue?.toLowerCase() || null,
            limit: MOVIES_LIMIT,
            offset: params.offset,
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

export const createMovie = createAsyncThunk('movie/create', async (payload: CreateMoviesParams) => {
    const response = await http.post<Movie>('/movies', {
        title: payload.name,
        year: Number(payload.year),
        actors: payload.actors,
        format: payload.format
    });

    if (response.error?.code === ErrorCodes.MovieExists) {
        Alert.alert('Ups!', 'Movie exists');
        return;
    }
    

    return response.data;
});

export const uploadMovies = createAsyncThunk('movie/upload', async (payload: DocumentPickerAsset) => {
    // const formData = new FormData();
    // formData.append('images', payload.uri);
    // formData.append('title', 'title');
    // console.log({ formData });


    http.addHeader('Content-Type', 'multipart/form-data;');
    http.post('movies/import', { movis: payload.uri });
});
