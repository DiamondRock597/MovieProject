import React, { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { DocumentPickerAsset } from 'expo-document-picker';

import { BackButton } from 'components/BackButton';
import { useAppDispatch } from 'store/hooks';
import { Colors } from 'constants/colors';
import { FileSystem } from 'api/file-system';
import { uploadMovies } from 'features/movie/movie.actions';
import { logout } from 'features/user/user.actions';

import { styles } from './styles';

export const Settings = () => {
  const [file, setFileName] = useState<DocumentPickerAsset | null>(null);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const uploadFile = useCallback(async () => {
    try {
      setFileName(null);
      const file = await FileSystem.pick('text/plain');

      if (!file) {
        return;
      }

      if (!file.size) {
        Alert.alert('Ups!', `File ${file.name} is empty.`);
        return;
      }

      setFileName(file);
    } catch (error) {
      Alert.alert('Ups!', 'Something went wrong');
    }
  }, [setFileName]);

  const submit = useCallback(() => {
    if (!file) {
      return;
    }

    dispatch(uploadMovies(file));
  }, [dispatch, file]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.headerTitle}>Settings</Text>
        <AntDesign onPress={handleLogout} name='logout' size={25} />
      </View>
      <Text style={styles.title}>Filename: {file?.name}</Text>
      <Button onPress={uploadFile} title='Import movies' color={Colors.Secondary} buttonStyle={styles.uploadButton} />
      <Button
        type='outline'
        onPress={submit}
        title='Upload movies'
        titleStyle={styles.submitButtonTitle}
        color={Colors.Primary}
        buttonStyle={styles.submitButton}
      />
    </SafeAreaView>
  )
}