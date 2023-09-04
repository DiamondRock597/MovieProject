import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

import { MovieCard } from 'features/movie/components/MovieCard';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { MOVIES_LIMIT, fetchMovies } from 'features/movie/movie.actions';
import { Colors } from 'constants/colors';
import { RootNavigationProp } from 'navigation/types';

import { styles } from './styles';

export const Home = () => {
  const { items, isLoading, offset } = useAppSelector(({ movie }) => movie);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => dispatch(fetchMovies({ offset: 0 })));

    return focusListener;
  }, [dispatch, navigation]);

  const onEndReached = () => {
    if (isLoading) {
      return;
    }

    dispatch(fetchMovies({ offset: offset + MOVIES_LIMIT }));
  };

  const onRefresh = () => dispatch(fetchMovies({ offset: 0 }));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        data={items}
        numColumns={2}
        keyExtractor={(item) => `MovieItem-${item.id}`}
        renderItem={({ item }) => <MovieCard item={item} />}
        refreshing={isLoading}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
      />
      <Button title='Add new movie' buttonStyle={styles.buttonStyle} size='md' color={Colors.Secondary} />
    </SafeAreaView>
  )
}