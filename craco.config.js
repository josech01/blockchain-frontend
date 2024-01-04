const path = require('path');
const webpack = require('webpack');

module.exports = {
  babel: {
    plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
  },
  webpack: {
    resolve: {
      alias: {
        '@uniswap/widgets': '@uniswap/widgets/dist',
      },
    },
  },
};
