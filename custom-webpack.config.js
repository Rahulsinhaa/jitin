module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    },
  },
};
