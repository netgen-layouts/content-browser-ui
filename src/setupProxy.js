const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/cb/api', { target: `http://enterprise.site/ngadminui`, changeOrigin: true }));
};
