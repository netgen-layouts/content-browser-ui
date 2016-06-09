'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({
  tagName: 'li',
  template: 'selected_item',

  events: {
    'click a': '$remove_item'
  },

  $remove_item: function(e){
    e.preventDefault();
    this.model.uncheck();
  }

});
