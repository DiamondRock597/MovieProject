import { NavigationProp } from "@react-navigation/native";

export enum RootStackRoutes {
  Login = 'LOGIN',
  Register = 'REGISTER',
  Home = 'HOME',
}

export type RootStackParamsList = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.Login]: undefined;
  [RootStackRoutes.Register]: undefined;
};


export type RootNavigationProp = NavigationProp<RootStackParamsList>;
