'use strict';

var Core = require('core_boot');
var MixinTree = require('core_tree');

module.exports = Core.Model
  .extend(MixinTree)
  .extend({

    content_browser: true,

    path: function(){
      return this.collection.tree_config.get('root_path') +  '/browse';
    },

    has_children: function(){
      return this.attributes.has_children;
    },

    has_sub_categories: function(){
      return this.attributes.has_sub_categories;
    },

    can_show_children: function(){
      return this.attributes.has_children && !this.is_root_model;
    },

    type: function(){
      return this.attributes.type;
    },

    short_name: function(){
      return this.get('name').length > 27 ? this.get('name').substring(0, 27) + '...' : this.get('name');
    },

    select: function(){
      this.selected = true;
    },

    deselect: function(){
      this.selected = false;
    },

    check: function(){
      this.selected_collection().add(this);
      return this;
    },

    uncheck: function(){
      this.selected_collection().remove(this);
      return this;
    },

    is_checked: function(){
      return this.selected_collection().get(this.id);
    },

    selected_collection: function(){
      return (this.collection && this.collection.browser && this.collection.browser.selected_collection) ||
        (this.browser && this.browser.selected_collection);
    }

  }, {
    BREADCRUMB_TEXT: 'Search for'
  });
