import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MovieFormats } from "models/movie";
import { useAppDispatch } from "store/hooks";
import { useForm } from "react-hook-form";
import { createMovie } from "features/movie/movie.actions";

export enum AddingMovieFormValues {
    Name = 'name',
    Year = 'year'
}

export interface AddingMovieFormTypes {
    [AddingMovieFormValues.Name]: string;
    [AddingMovieFormValues.Year]: number;
}


const addingMovieSchema = yup.object<AddingMovieFormTypes>().shape({
    [AddingMovieFormValues.Name]: yup.string().required('Name is required').trim('Spaces is disabled'),
    [AddingMovieFormValues.Year]: yup.number().required('Year is required').integer().min(1900, 'It should be greater than 1900').max(2025, 'It should be less than 1900')
});

export const useAddingMovie = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const { control, handleSubmit } = useForm<AddingMovieFormTypes>({
        defaultValues: {
            name: '',
            year: 2000
        },
        resolver: yupResolver(addingMovieSchema)
    });

    const [isVisible, setIsVisible] = useState(false);
    const [format, setFormat] = useState<MovieFormats>(MovieFormats.DVD);
    const [actors, setActors] = useState<Array<string>>([]);

    const addActorInList = useCallback((actor: string) => {
        if (!actor) {
            Alert.alert('Ups!', 'You are trying to add an actor without name and surname');
            return;
        }

        setActors((prev) => [...prev, actor]);
    }, [setActors]);
    const hideFormatModal = useCallback(() => setIsVisible(false), [setIsVisible]);
    const openFormatModal = useCallback(() => setIsVisible(true), [setIsVisible]);
    const goBack = useCallback(() => navigation.goBack(), [navigation]);

    const handelCreateMovie = useCallback(
        ({ name, year }: AddingMovieFormTypes) => {
            dispatch(createMovie({ name, year, format, actors }));
            goBack();
        },
        [actors, format, dispatch, goBack]);

    const onSubmit = useCallback(() => handleSubmit(handelCreateMovie)(), [handleSubmit, handelCreateMovie]);

    return {
        isVisible,
        addActorInList,
        hideFormatModal,
        openFormatModal,
        format,
        setFormat,
        actors,
        control,
        onSubmit
    }
}