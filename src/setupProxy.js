const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/cb/api', { target: `${process.env.API_URL}ngadminui`, changeOrigin: true }));
    app.use(proxy('/ngadminui', { target: process.env.API_URL, changeOrigin: true }));
};
