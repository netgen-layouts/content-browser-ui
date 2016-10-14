'use strict';

var Core = require('netgen-core');

module.exports = Core.View.extend({
  extend_with: ['browser'],
  template: 'root_item',
  tagName: 'option'
});
