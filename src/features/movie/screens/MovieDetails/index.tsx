import { Text, ActivityIndicator, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Image } from '@rneui/base';

import { RootRouteProp, RootStackRoutes } from 'navigation/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteMovie, fetchMovie } from 'features/movie/movie.actions';
import { clearSelectedMovie } from 'features/movie/movie.slice';

import { styles } from './styles';

const MEM_IMAGE_URL = 'https://www.watchmojo.com/uploads/thumbs720/Fi-M-Top10-Movie-Scenes-That-Became-Internet-Memes-720p30.jpg';

export const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { selectedMovie, isLoading } = useAppSelector(({ movie }) => movie);
  const navigation = useNavigation();
  const { params: { movieId } } = useRoute<RootRouteProp<RootStackRoutes.MovieDetails>>();

  useEffect(() => {
    dispatch(fetchMovie(movieId));

    return () => {
      dispatch(clearSelectedMovie());
    }
  }, [dispatch, movieId]);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const deleteSelectedMovie = useCallback(() => {
    dispatch(deleteMovie(movieId));
    goBack();
  }, [dispatch, goBack, movieId]);

  if (isLoading || !selectedMovie) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons onPress={goBack} name="arrow-back-sharp" size={35} color="black" />
        <Text style={styles.headerTitle} numberOfLines={1}>{selectedMovie.title}</Text>
        <Ionicons onPress={deleteSelectedMovie} name="trash-sharp" size={35} color="black" />
      </View>
      <Image containerStyle={styles.image} resizeMode='contain' source={{ uri: MEM_IMAGE_URL }} />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Details:</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Year: <Text style={styles.value}>{selectedMovie.year}</Text></Text>
          <Text style={styles.title}>Format: <Text style={styles.value}>{selectedMovie.format}</Text></Text>
        </View>
        <Text style={styles.sectionTitle}>Actors:</Text>
        <FlatList
          data={selectedMovie.actors}
          contentContainerStyle={styles.detailsContainer}
          keyExtractor={(item) => `ActorItem-${item.id}`}
          renderItem={({ item }) => <Text style={styles.title}>{item.name}</Text>}
        />
      </View>
    </SafeAreaView>
  )
}