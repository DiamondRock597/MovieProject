import React, { useMemo } from 'react';
import { View, } from 'react-native';
import { Button, Input } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import { MovieFormatPicker } from 'features/movie/components/MovieFormatPicker';
import { ActorsInput } from 'features/movie/components/ActorsInput';
import { BackButton } from 'components/BackButton';
import { Colors } from 'constants/colors';
import { useAddingMovie, AddingMovieFormValues, YEAR_INPUT_RULES } from './useAddingMovie';

import { styles } from './styles';

export const AddingMovie = () => {
  const {
    openFormatModal,
    control,
    format,
    onSubmit,
    addActorInList,
    actors,
    hideFormatModal,
    isVisible,
    setFormat
  } = useAddingMovie();

  const formatRightIcon = useMemo(() => <Ionicons onPress={openFormatModal} name="caret-down" size={18} color="black" />, [openFormatModal]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          rules={{ required: { value: true, message: 'Name is required' } }}
          name={AddingMovieFormValues.Name}
          render={({ field, fieldState: { error } }) => (
            <Input
              errorMessage={error?.message}
              label='Name'
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={AddingMovieFormValues.Year}
          rules={YEAR_INPUT_RULES}
          render={({ field, fieldState: { error } }) => (
            <Input
              label='Year'
              errorMessage={error?.message}
              value={field.value.toString()}
              keyboardType='number-pad'
              onChangeText={field.onChange}
            />
          )}
        />
        <Input
          editable={false}
          label='Format'
          value={format}
          rightIcon={formatRightIcon}
        />
        <ActorsInput actors={actors} addActorInList={addActorInList} />
      </View>
      <MovieFormatPicker onRequestClose={hideFormatModal} isVisible={isVisible} setFormat={setFormat} />
      <Button onPress={onSubmit} title='Add new movie' color={Colors.Secondary} buttonStyle={styles.buttonStyle} />
    </SafeAreaView>
  )
}