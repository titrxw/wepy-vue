const path = require('path');
var prod = process.env.NODE_ENV === 'build';

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: !prod,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  compilers: {
    less: {
      compress: prod
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
    env: process.env.NODE_ENV,
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

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
