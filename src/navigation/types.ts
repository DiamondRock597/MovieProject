import { NavigationProp, RouteProp } from "@react-navigation/native";

export enum RootStackRoutes {
  Login = 'LOGIN',
  Register = 'REGISTER',
  Home = 'HOME',
  MovieDetails = 'MOVIE_DETAILS'
}

export type RootStackParamsList = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: undefined;
  [RootStackRoutes.Register]: undefined;
  [RootStackRoutes.MovieDetails]: {
    movieId: number;
  }
};


export type RootNavigationProp = NavigationProp<RootStackParamsList>;
export type RootRouteProp<Route extends RootStackRoutes> = RouteProp<RootStackParamsList, Route>;
