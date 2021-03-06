const webpack = require('webpack');
const withTM = require('next-transpile-modules')(['vis-timeline']); // pass the modules you would like to see transpiled

module.exports = withTM({
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
