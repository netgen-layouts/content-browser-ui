'use strict';

var Core = require('netgen-core');

module.exports = Core.Backbone.Model.extend({
  save_visibility: function(visible){
    var local_id = 'column_' + this.get('column_id');
    visible ? localStorage.setItem(local_id, visible) : localStorage.removeItem(local_id);
    this.set('visible', visible);
  }
});
