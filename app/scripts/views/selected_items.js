'use strict';

var Core = require('core');
var SelectedItemView = require('./selected_item');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  ViewItem: SelectedItemView,
  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.listenTo(Core, 'browser:check browser:uncheck', this.render);
    return this;
  },
});
