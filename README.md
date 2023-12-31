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
4. `feature` - the core folder for each feature in the app, it contains logics, screens and components. All logics related to one feature is in `slice` file and the async endpoints are in `actions` file. Also each feature has `components` folder for reusable ui components in the particular feature.
5. `models` - core types/models from api.
6. `navigation` - folder for navigators in React Native application, contains navigators and types for them.
7. `store` - initial point of logics in application, where reducers init.
8. `utils` - helpful functions or types.


## How to run?
- install `docker`
- `docker pull webbylabhub/movies`
- `docker run --name movies -p 8000:8000 webbylabhub/movies`
- install expo-cli
- `yarn` or `npm install` to install dependencies
- `npx expo start`