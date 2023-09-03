import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import { SwitchFooter } from 'features/user/components/SwitchFooter';
import { LoginFormValues, useLogin } from './useLogin';

import { styles } from './styles';

export const Login = () => {
    const { control, navigateToRegister, onSubmit } = useLogin();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome back to MovieProject!</Text>
            <View style={styles.content}>
                <Controller control={control} name={LoginFormValues.Email} render={({ field }) => (
                    <Input label='Email' keyboardType='email-address' value={field.value} onChangeText={field.onChange} />
                )} />
                <Controller control={control} name={LoginFormValues.Password} render={({ field, fieldState: { error } }) => (
                    <Input label='Password' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
                )} />
            </View>
            <Button title='Sign in' buttonStyle={styles.buttonStyle} onPress={onSubmit} />
            <SwitchFooter title="Don't have an account?" subtitle='Sign up' onPress={navigateToRegister} />
        </SafeAreaView>
    )
}