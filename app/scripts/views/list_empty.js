'use strict';

var Core = require('netgen-core');

module.exports = Core.View.extend({
  template: 'list_empty',
  prevent_auto_render: true
});
