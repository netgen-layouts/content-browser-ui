'use strict';

var Core = require('core_boot');

module.exports = Core.Backbone.Model.extend({
  save_visibility: function(visible){
    this.save({ visible: visible });
  }
});
