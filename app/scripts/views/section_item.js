'use strict';

var Core = require('@netgen/layouts-ui-core');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  template: 'root_item',
  tagName: 'option',
  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.$el.attr('selected', this.model.get('default'));
    return this;
  },
});
