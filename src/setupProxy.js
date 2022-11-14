const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api/upload',
        createProxyMiddleware(
            {
                target: 'http://119.209.77.170:5000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            }
        )
    )
}