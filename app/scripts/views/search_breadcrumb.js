'use strict';

var Core = require('core_boot');
var BreadcrumbSearchItemView = require('./breadcrumb_search_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: BreadcrumbSearchItemView,

  render_items: function(items, el, ViewItem){

    items = this.collection.path ? this.collection.path.models : [];
    var model = items[0];

    model && model.set({ name: 'Search for: "' + this.collection.searchText + '"', dummy: true });

    return Core.View.prototype.render_items.call(this, items, el, ViewItem);
  },
});
