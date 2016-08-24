'use strict';

var Core = require('core');

module.exports = Core.Backbone.Model.extend({
  save_visibility: function(visible){
    this.save({ visible: visible });
  }
});
