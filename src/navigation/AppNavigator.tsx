import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from 'features/movie/screens/Home';
import { Login } from 'features/user/screens/Login';
import { Register } from 'features/user/screens/Register';
import { MovieDetails } from 'features/movie/screens/MovieDetails';
import { AddingMovie } from 'features/movie/screens/AddingMovie';
import { useAppSelector } from 'store/hooks';
import { RootStackParamsList, RootStackRoutes } from './types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const AppNavigator = () => {
  const token = useAppSelector(({ user }) => user.token);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} initialRouteName={RootStackRoutes.Login}>
        {token ? (
          <Stack.Group>
            <Stack.Screen name={RootStackRoutes.Home} component={Home} />
            <Stack.Screen name={RootStackRoutes.MovieDetails} component={MovieDetails} />
            <Stack.Screen name={RootStackRoutes.AddingMovie} component={AddingMovie} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name={RootStackRoutes.Register} component={Register} />
            <Stack.Screen name={RootStackRoutes.Login} component={Login} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
