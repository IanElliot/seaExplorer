const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    // compress: true,
    port: 8080,
    publicPath: '/build',
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss?/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
