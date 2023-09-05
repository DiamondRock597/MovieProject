import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { MOVIES_LIMIT, fetchMovies } from 'features/movie/movie.actions';
import { RootNavigationProp, RootStackRoutes } from 'navigation/types';

export const useHome = () => {
    const { items, isLoading, offset } = useAppSelector(({ movie }) => movie);
    const dispatch = useAppDispatch();

    const navigation = useNavigation<RootNavigationProp>();

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => dispatch(fetchMovies({ offset: 0 })));

        return focusListener;
    }, [dispatch, navigation]);

    const onEndReached = useCallback(() => {
        if (isLoading) {
            return;
        }

        dispatch(fetchMovies({ offset: offset + MOVIES_LIMIT }));
    }, [dispatch, isLoading, offset]);

    const onRefresh = useCallback(() => dispatch(fetchMovies({ offset: 0 })), [dispatch]);

    const navigateToAdding = useCallback(() => navigation.navigate(RootStackRoutes.AddingMovie), [navigation]);

    return {
        onRefresh,
        onEndReached,
        items,
        isLoading,
        navigateToAdding
    }
}