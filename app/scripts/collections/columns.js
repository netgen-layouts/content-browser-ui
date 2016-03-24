'use strict';

var Core = require('core_boot');
var Column = require('../models/column');

module.exports = Core.Backbone.Collection.extend({

  model: Column,

  localStorage: function(){
    return new Core.Backbone.LocalStorage('table_column_' + this.suffix);
  },

  save_visibility: function(name, checked){
    var model = this.findWhere({ column_id: name });
    model.save_visibility(checked);
  },

  invisibles: function(){
    return this.where({ visible: false });
  }

});
