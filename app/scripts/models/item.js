'use strict';

var Core = require('core_boot');
var MixinTree = require('core_tree');
var _ = require('underscore');

module.exports = Core.Model
  .extend(MixinTree)
  .extend({

    content_browser: true,

    index: [
      ['value']
    ],

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
      this.trigger('checked', this);
      this.selected_collection().add(this);
      Core.trigger('browser:check', this.get('value'))
      return this;
    },

    uncheck: function(){
      this.trigger('unchecked', this);
      this.selected_collection().remove(this);
      console.log('core trigger', this.get('value'));
      Core.trigger('browser:uncheck', this.get('value'))
      return this;
    },

    is_checked: function(){
      return this.selected_collection().where({value: this.get('value')}).length;
    },

    is_disabled: function(){
      return _.contains(this.get_browser().disabled_item_ids, this.get('value'));
    },

    get_browser: function(){
      return this.browser || (this.collection && this.collection.browser);
    },

    selected_collection: function(){
      return this.get_browser().selected_collection;
    },

    //For tree
    fetch_children: function(){
      var items = new this.collection.constructor();
      items.browser = this.collection.browser;
      this.loaded_children = items;
      items.on('categories:success', function(e){
        this.trigger('categories:success');
      }.bind(this))

      items.on('categories:error', function(e){
        this.trigger('categories:error');
      }.bind(this))

      return items.fetch_tree_by_model_id(this.id);
    },


  }, {
    BREADCRUMB_TEXT: 'Search for'
  });
