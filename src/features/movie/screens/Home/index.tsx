import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';

import { MovieCard } from 'features/movie/components/MovieCard';
import { Colors } from 'constants/colors';
import { useHome } from './useHome';

import { styles } from './styles';

export const Home = () => {
  const { onRefresh, items, isLoading, onEndReached, navigateToAdding } = useHome();

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
      <Button
        onPress={navigateToAdding}
        title='Add new movie'
        buttonStyle={styles.buttonStyle}
        size='md'
        color={Colors.Secondary}
      />
    </SafeAreaView>
  )
}