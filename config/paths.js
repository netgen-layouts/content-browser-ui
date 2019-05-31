const path = require('path');

module.exports = {
  dotenv: path.resolve('.env'),
  appBuild: path.resolve('bundle/Resources/public'),
  appPublic: path.resolve('public'),
  appHtml: path.resolve('public/index.html'),
  appIndexJs: path.resolve('src/index.js'),
  appPackageJson: path.resolve('package.json'),
  appSrc: path.resolve('src'),
  proxySetup: path.resolve('src/setupProxy.js'),
};
