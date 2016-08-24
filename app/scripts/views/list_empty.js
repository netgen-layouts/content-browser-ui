'use strict';

var Core = require('core');

module.exports = Core.View.extend({
  template: 'list_empty',
  prevent_auto_render: true
});
