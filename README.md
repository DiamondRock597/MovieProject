# MovieProject

## Technologies:
 - expo
 - redux-toolkit
 - react-navigation
 - react-native-elements
 - axios
 - react-hook-form
 - typescript

## Architecture:

I used the simplie module's architecture, where the features are separated by their destination.

1. `api` - folder for services, where a developer can wrap library to use in the app.
2. `components` - the common ui components to reuse in whole application.
3. `constants` - constant values to use in the app.
4. `feature` - the core folder for each feature in the app, it contains logics, screens and components.
5. `models` - core types/models from api.
6. `navigation` - folder for navigators in React Native application, contains navigators and types for them.
7. `store` - initial point of logics in application, where reducers init.
8. `utils` - helpful functions or types


## How to run?

- install expo-cli
- `yarn` or `npm install` to install dependencies
- `npx expo start`