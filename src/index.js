'use strict';
module.exports = {
  book: {
    assets: './assets',
    css: [ 'plugin.css' ],
    js: [ 'plugin.js' ]
  },
  blocks: {
    fleximages: {
      process: function( block ) {
        var Plugin = require('../assets/plugin.js')
        var config = this.options.pluginsConfig.flexImages || {};
        var flexbox = new Plugin.Flexbox(block, config);

        console.log(flexbox.output); // TODO:0 remove log comments

        return 'some image block';
      }
    }
  }
};
