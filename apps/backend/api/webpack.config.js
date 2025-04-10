const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  // Add specific configurations for the Node.js backend
  config.target = 'node';
  
  // Prevent Webpack from bundling certain Node.js core modules
  config.node = {
    __dirname: false,
    __filename: false,
  };
  
  // Prevent bundling of certain dependencies
  config.externals = [
    function(context, request, callback) {
      // Add any packages that should be treated as external
      const externals = [
        'pg-native',
        'mongodb-client-encryption',
        'aws-sdk',
        'nock',
        'mock-aws-s3',
        'node-gyp'
      ];
      
      // If the request is for one of these packages, mark it as external
      if (externals.includes(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    }
  ];
  
  return config;
});
