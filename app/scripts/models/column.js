'use strict';

var Core = require('@netgen/layouts-core-ui');

module.exports = Core.Backbone.Model.extend({
  save_visibility: function(visible){
    this.save({ visible: visible });
  }
});
