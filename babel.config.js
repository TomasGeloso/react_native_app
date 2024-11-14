module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ["./"],
          alias: {
            '@global': './global.css',
            '@components': './components',
            '@services': './services',
            '@hooks': './hooks',
            '@context': './context',
            '@schemas': './schemas',
            '@config': './config',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
