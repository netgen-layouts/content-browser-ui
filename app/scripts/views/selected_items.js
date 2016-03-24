'use strict';

var Core = require('core_boot');
var SelectedItemView = require('./selected_item');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  ViewItem: SelectedItemView
});
