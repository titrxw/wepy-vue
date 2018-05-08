const path = require('path');
var prod = process.env.NODE_ENV === 'dev';

module.exports = {
  wpyExt: '.vue',
  eslint: false,
  cliLogs: !prod,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      page: path.join(__dirname, 'src/page.js'),
      component: path.join(__dirname, 'src/component.js'),
    }
  },
  compilers: {
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
