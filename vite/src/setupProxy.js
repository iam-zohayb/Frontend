//vite/src/setupProxy
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apii-cyan.vercel.app',
      changeOrigin: true,
    })
  );
};
