'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  template: 'root_item',
  tagName: 'option'
});
