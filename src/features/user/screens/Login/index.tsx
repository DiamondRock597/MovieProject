import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import { SwitchFooter } from 'features/user/components/SwitchFooter';
import { LoginFormValues, useLogin } from './useLogin';

import { styles } from './styles';

export const Login = () => {
    const { control, navigateToRegister, onSubmit } = useLogin();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>Welcome back to MovieProject!</Text>
            <View style={styles.content}>
                <Controller
                    control={control}
                    name={LoginFormValues.Email}
                    render={({ field, fieldState: { error } }) => (
                        <Input label='Email' errorMessage={error?.message} keyboardType='email-address' value={field.value} onChangeText={field.onChange} />
                    )}
                />
                <Controller
                    control={control}
                    name={LoginFormValues.Password}
                    render={({ field, fieldState: { error } }) => (
                        <Input label='Password' secureTextEntry value={field.value} onChangeText={field.onChange} errorMessage={error?.message} />
                    )}
                />
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={onSubmit}>
                <Text style={styles.buttonTitle}>
                    Sign in
                </Text>
            </TouchableOpacity>
            <SwitchFooter title="Don't have an account?" subtitle='Sign up' onPress={navigateToRegister} />
        </SafeAreaView>
    )
}