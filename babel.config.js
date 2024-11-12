module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel", [
      'module-resolver',
      {
        root: ["./"],
        alias: {
          '@components': './components',
          '@services': './services',
          '@hooks': './hooks',
          '@context': './context',
          '@schemas': './schemas',
          '@config': './config',
          '@assets': './assets',
        }
      }
    ]],
  };
};
