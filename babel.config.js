module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.json', '.tsx'],
          alias: {
            store: './src/store',
            api: './src/api',
            components: './src/components',
            constatns: './src/constants',
            features: './src/features',
            models: './src/models',
            navigation: './src/navigation',
            utils: './src/utils',
            envs: '../envs'
          },
        },
      ],
    ],
  };
};
