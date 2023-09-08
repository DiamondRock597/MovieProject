import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FAB } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';

import { MovieCard } from 'features/movie/components/MovieCard';
import { Colors } from 'constants/colors';
import { useHome } from './useHome';
import { SearchInput } from 'features/movie/components/SearchInput';

import { styles } from './styles';

export const Home = () => {
  const {
    items,
    isLoading,
    order,
    handleSearchValue,
    selectedMethod,
    onRefresh,
    onEndReached,
    navigateToAdding,
    changeOrder,
    navigateToSettings,
    setSelectedMethod
  } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <FAB size='small' title={order} color={Colors.Secondary} onPress={changeOrder} />
        <AntDesign onPress={navigateToSettings} name='setting' size={25} />
      </View>
      <SearchInput selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} onChangeText={handleSearchValue} />
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