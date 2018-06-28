'use strict';

var Core = require('netgen-core');
var Column = require('../models/column');
var _ = Core._;

module.exports = Core.Backbone.Collection.extend({

  model: Column,

  /* temporary fix for name column always visible */
  parse: function(result){
    Core.Backbone.Collection.prototype.parse.apply(this, arguments);
    var name = _.findWhere(result, {column_id: 'name'});
    name && (name.visible = true);
    return result;
  },

  save_visibility: function(name, checked){
    var model = this.findWhere({ column_id: name });
    model.save_visibility(checked);
  },

  invisibles: function(){
    return this.where({ visible: false });
  },

  /* don't show name column in table options */
  for_menu: function(){
    return this.filter(function(model){
      return model.get('name')  !== 'Name';
    });
  }

});
