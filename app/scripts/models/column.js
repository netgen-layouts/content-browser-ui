'use strict';

var Core = require('netgen-core');

module.exports = Core.Backbone.Model.extend({
  save_visibility: function(visible){
    this.save({ visible: visible });
  }
});
