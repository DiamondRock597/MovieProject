import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { RootNavigationProp, RootStackRoutes } from 'navigation/types';
import { SwitchFooter } from 'features/user/components/SwitchFooter';

import { styles } from './styles';

export const Login = () => {
    const navigation = useNavigation<RootNavigationProp>();

    const navigateToRegister = useCallback(() => navigation.navigate(RootStackRoutes.Register), [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome back to MovieProject!</Text>
            <View style={styles.content}>
                <Input label='Email' keyboardType='email-address' />
                <Input label='Password' secureTextEntry />
            </View>
            <Button title='Sign in' buttonStyle={styles.buttonStyle} />
            <SwitchFooter title="Don't have an account?" subtitle='Sign up' onPress={navigateToRegister} />
        </SafeAreaView>
    )
}