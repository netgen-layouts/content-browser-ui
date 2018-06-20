'use strict';

var Core = require('@netgen/layouts-core-ui');
var BreadcrumbItemView= require('./breadcrumb_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: BreadcrumbItemView,
  render_items: function(items, el, ViewItem){
    items = this.collection.path ? this.collection.path.models : [];
    return Core.View.prototype.render_items.call(this, items, el, ViewItem);
  },
});
