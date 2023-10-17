// module.exports = {
//   mode: 'development',
//   entry: './src/main.ts',
//   resolve: {
//     fallback: {
//       crypto: require.resolve('crypto-browserify')
//     },
//   },
// };


const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/login-signup'), // Adjust the output path
    filename: 'bundle.js', // Adjust the output filename as needed
  },
};
