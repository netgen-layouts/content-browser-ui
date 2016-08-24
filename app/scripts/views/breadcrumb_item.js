'use strict';

var Core = require('core');

module.exports = Core.View.extend({
  template: 'breadcrumb_item',
  tagName: 'li',
  className: function(){
    return this.model.get('last') ? 'active' : '';
  },

  events: {
    'click a': '$open'
  },

  $open: function(e){
    e.preventDefault();
    var tree_config = this.model.collection.items_collection.browser.tree_config,
        tabs = this.parent.tabs;

    if(tree_config.is_in_root_item(this.model.id)){
      Core.trigger('browser:select_section', this.model)
    }else{
      tabs.list_items.fetch_list_by_model_id(this.model.id);
    }

  }

});
