'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  template: 'root_item',
  tagName: 'option',

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.setup_dom();
    return this;
  },

  setup_dom: function(){
    this.$el.attr('data-id', this.model.id);
  }

});
