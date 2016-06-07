'use strict';

var Core = require('core_boot');
var BreadcrumbItemView= require('./breadcrumb_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: BreadcrumbItemView,
  prevent_auto_render: true
});
