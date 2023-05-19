const { defineConfig } = require('@vue/cli-service')
//フロントエンドのポート番号(port)とバックエンド(Proxy)をつなげる
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8080,
    proxy:'http://localhost:3000'
  },
  outputDir:"../backend/public"
})
