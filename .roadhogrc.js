const path = require('path');
const pxtorem = require('postcss-pxtorem');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/svg/'),  // 业务代码本地私有 svg 存放目录
];


export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  disableCSSModules:true,
  publicPath : "/" ,
  "theme": "./theme.config.js",
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        'add-module-exports',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        'add-module-exports',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  },
  proxy : {
      "/inner": {
        "target": "http://localhost:3578",
        "changeOrigin": true,
        "pathRewrite": { "^/inner" : "" }
     }
   }
}
