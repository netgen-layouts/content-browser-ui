'use strict';

var Core = require('core_boot');

module.exports = Core.Backbone.Model.extend({

  localStorage: function(){
    return new Core.Backbone.LocalStorage('browser_config');
  }

});
