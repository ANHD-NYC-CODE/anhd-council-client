const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    'shared': path.resolve(__dirname, 'src/shared'),
    'Store': path.resolve(__dirname, 'src/Store'),
    'App': path.resolve(__dirname, 'src/App'),
    'AppProvider': path.resolve(__dirname, 'src/AppProvider')
  };
  return config;
} 