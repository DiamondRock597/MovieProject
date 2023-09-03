import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from '@rneui/base';
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
        <Controller control={control} name={RegisterFormValues.Email} render={({ field }) => (
          <Input label='Email' keyboardType='email-address' value={field.value} onChangeText={field.onChange} />
        )} />
        <Controller control={control} name={RegisterFormValues.Name} render={({ field }) => (
          <Input label='Name' value={field.value} onChangeText={field.onChange} />
        )} />
        <Controller control={control} rules={PASSWORD_RULES} name={RegisterFormValues.Password} render={({ field, fieldState: { error } }) => (
          <Input label='Password' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
        )} />
        <Controller control={control} rules={PASSWORD_RULES} name={RegisterFormValues.Confirmation} render={({ field, fieldState: { error } }) => (
          <Input label='Password confirmation' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
        )} />
      </View>
      <Button title='Sign up' buttonStyle={styles.buttonStyle} onPress={onSubmit} />
      <SwitchFooter title='Already have an account?' subtitle='Sign in' onPress={navigateToLogin} />
    </SafeAreaView>
  )
}
