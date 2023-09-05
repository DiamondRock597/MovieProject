import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { MOVIES_LIMIT, fetchMovies, } from 'features/movie/movie.actions';
import { logout } from 'features/user/user.actions';
import { RootNavigationProp, RootStackRoutes } from 'navigation/types';
import { Orders } from 'constants/order';
import { SearchMethod } from 'constants/searchMethod';

const SEARCH_INPUT_DELAY = 200;

export const useHome = () => {
    const [order, setOrder] = useState(Orders.ASC);
    const [selectedMethod, setSelectedMethod] = useState(SearchMethod.Title);
    const [searchValue, setSearchValue] = useState('');

    const { items, isLoading, offset } = useAppSelector(({ movie }) => movie);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<RootNavigationProp>();

    const onRefresh = useCallback(() => dispatch(
        fetchMovies({ offset: 0, order, searchValue, searchMethod: selectedMethod })
    ), [dispatch, order, searchValue, selectedMethod]);

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => dispatch(fetchMovies({
            offset: 0
        })));

        return focusListener;
    }, [dispatch, navigation]);

    const onEndReached = useCallback(() => {
        if (isLoading) {
            return;
        }

        dispatch(
            fetchMovies({
                offset: offset + MOVIES_LIMIT,
                order, searchValue,
                searchMethod: selectedMethod
            })
        );
    }, [dispatch, isLoading, offset, order, searchValue, selectedMethod]);

    const navigateToAdding = useCallback(() => navigation.navigate(RootStackRoutes.AddingMovie), [navigation]);
    const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

    const changeOrder = useCallback(() => setOrder((prev) => prev === Orders.ASC ? Orders.DESC : Orders.ASC), [setOrder]);

    return {
        onRefresh,
        onEndReached,
        items,
        isLoading,
        navigateToAdding,
        order,
        changeOrder,
        handleLogout,
        selectedMethod,
        setSelectedMethod,
        handleSearchValue: _.debounce(setSearchValue, SEARCH_INPUT_DELAY)
    }
}