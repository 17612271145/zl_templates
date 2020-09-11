const path = require("path");
const devServer = require('./server');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: '',
  productionSourceMap: false,
  css: {
    extract:false,
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack() {
    return {
      resolve: {
        extensions: [".js",".ts", ".vue", ".json"],
        alias: {
          src:resolve('src'),
        }
      }
    };
  },
  chainWebpack: config=>{
    config.module
      .rule('ts-loader')
      .test(/\.tsx?$/)
      .exclude.add(/node_modules/)
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/]
      });
  },
  devServer
};
