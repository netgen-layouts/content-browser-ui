const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  dotenv: path.resolve('.env'),
  appBuild: path.resolve('bundle/Resources/public'),
  appPublic: path.resolve('public'),
  appHtml: path.resolve('public/index.html'),
  appIndexJs: path.resolve('src/index.js'),
  appPackageJson: path.resolve('package.json'),
  appSrc: path.resolve('src'),
  proxySetup: path.resolve('src/setupProxy.js'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
