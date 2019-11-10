/* global module require */
const variables = require('./src/styles/variables');

module.exports = {
  plugins: [
    require('postcss-for'),
    require('postcss-each'),
    require('postcss-preset-env')({ stage: 0 }),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-simple-vars')({ variables }),
    require('postcss-automath'),
    require('postcss-color-mod-function'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
