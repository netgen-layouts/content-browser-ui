const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/cb/api', proxy({ target: process.env.SITE_URL, changeOrigin: true }));
}
