const proxyObj = {}
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:3000', // 后端地址
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}

module.exports = {
  publicPath: '/jd',
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
