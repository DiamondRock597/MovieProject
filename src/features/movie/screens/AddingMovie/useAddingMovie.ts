import { useCallback, useState } from "react";

import { MovieFormats } from "models/movie";
import { useAppDispatch } from "store/hooks";
import { useForm } from "react-hook-form";
import { createMovie } from "features/movie/movie.actions";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export enum AddingMovieFormValues {
    Name = 'name',
    Year = 'year'
}

export interface AddingMovieFormTypes {
    [AddingMovieFormValues.Name]: string;
    [AddingMovieFormValues.Year]: number;
}


export const YEAR_INPUT_RULES = {
    maxLength: { value: 4, message: 'Too high for years' },
    minLength: { value: 1, message: 'Too low' }
}

export const useAddingMovie = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const { control, handleSubmit } = useForm<AddingMovieFormTypes>({
        defaultValues: {
            name: '',
            year: 2000
        }
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