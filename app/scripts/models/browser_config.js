'use strict';

var Core = require('netgen-core');

module.exports = Core.Backbone.Model.extend({

  localStorage: function(){
    return new Core.Backbone.LocalStorage('browser_config');
  }

});
