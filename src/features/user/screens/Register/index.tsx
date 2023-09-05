import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import { SwitchFooter } from 'features/user/components/SwitchFooter';
import { PASSWORD_RULES, RegisterFormValues, useRegister } from './useRegister';

import { styles } from './styles';

export const Register = () => {
  const { navigateToLogin, onSubmit, control } = useRegister();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to MovieProject!</Text>
      <View style={styles.content}>
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          name={RegisterFormValues.Email}
          render={({ field, fieldState: { error } }) => (
            <Input label='Email' keyboardType='email-address' errorMessage={error?.message} value={field.value} onChangeText={field.onChange} />
          )}
        />
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          name={RegisterFormValues.Name}
          render={({ field, fieldState: { error } }) => (
            <Input label='Name' value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          rules={PASSWORD_RULES}
          name={RegisterFormValues.Password}
          render={({ field, fieldState: { error } }) => (
            <Input label='Password' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          rules={PASSWORD_RULES}
          name={RegisterFormValues.Confirmation}
          render={({ field, fieldState: { error } }) => (
            <Input label='Password confirmation' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
          )}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={onSubmit} >
        <Text style={styles.buttonTitle}>
          Sign up
        </Text>
      </TouchableOpacity>
      <SwitchFooter title='Already have an account?' subtitle='Sign in' onPress={navigateToLogin} />
    </SafeAreaView>
  )
}
