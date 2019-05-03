const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/cb/api', { target: `${process.env.SITE_URL}${process.env.SITE_PREFIX}`, changeOrigin: true }));
    app.use(proxy(process.env.SITE_PREFIX, { target: process.env.SITE_URL, changeOrigin: true }));
};
