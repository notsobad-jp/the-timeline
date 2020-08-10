const webpack = require('webpack');
require('dotenv').config();
const withTM = require('next-transpile-modules')([]); // pass the modules you would like to see transpiled
const isProd = process.env.NODE_ENV === 'production'

module.exports = withTM({
  assetPrefix: isProd ? 'web' : '',
  webpack: (config, { isServer }) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
});
