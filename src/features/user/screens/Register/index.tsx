import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootNavigationProp, RootStackRoutes } from 'navigation/types';
import { SwitchFooter } from 'features/user/components/SwitchFooter';

import { styles } from './styles';
import { useForm } from 'react-hook-form';

export const Register = () => {
  const { control, } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: ''
    },
  });

  const navigation = useNavigation<RootNavigationProp>();

  const navigateToLogin = useCallback(() => navigation.navigate(RootStackRoutes.Login), [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to MovieProject!</Text>
      <View style={styles.content}>
        <Input label='Email' keyboardType='email-address' />
        <Input label='Name' />
        <Input label='Password' secureTextEntry />
        <Input label='Password confirmation' secureTextEntry />
      </View>
      <Button title='Sign up' buttonStyle={styles.buttonStyle} />
      <SwitchFooter title='Already have an account?' subtitle='Sign in' onPress={navigateToLogin} />
    </SafeAreaView>
  )
}
