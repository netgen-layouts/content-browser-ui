'use strict';

var Core = require('core');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  template: 'root_item',
  tagName: 'option'
});
