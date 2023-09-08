import { NavigationProp, RouteProp } from "@react-navigation/native";

export enum RootStackRoutes {
  Login = 'LOGIN',
  Register = 'REGISTER',
  Home = 'HOME',
  MovieDetails = 'MOVIE_DETAILS',
  AddingMovie = 'ADDING_MOVIE',
  Settings = 'SETTINGS'
}

export type RootStackParamsList = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: undefined;
  [RootStackRoutes.Register]: undefined;
  [RootStackRoutes.MovieDetails]: {
    movieId: number;
  }
  [RootStackRoutes.AddingMovie]: undefined;
  [RootStackRoutes.Settings]: undefined;
};


export type RootNavigationProp = NavigationProp<RootStackParamsList>;
export type RootRouteProp<Route extends RootStackRoutes> = RouteProp<RootStackParamsList, Route>;
