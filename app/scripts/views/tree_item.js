'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');

module.exports = Core.View.extend({
  template: 'tree_item',
  tagName: 'li',
  className: 'item',

  events:{
    'click': 'toggle_tree',
    'click a': 'open_tree'
  },

  limit: 3,
  current_page: 1,

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.setup_dom();
    return this;
  },

  setup_dom: function(){
    if(this.model.has_sub_categories()){
      this.$el.addClass('has_children');
    }

    this.$el.attr('data-id', this.model.id);
    this.$el.attr('data-type', this.model.type());
  },

  is_open: function(){
    return this.$el.hasClass('open');
  },

  toggle_tree: function(e){
    e.stopPropagation();

    if(!this.is_open()){
      this.open_tree(e);
    }else{
      this.$el.toggleClass('open');
    }
  },

  select_tree_item: function(){
    $('.tree .selected').removeClass('selected');
    this.$el.addClass('selected');
  },

  open_tree: function(e){
    e.stopPropagation();

    this.select_tree_item();

    this.show_preview();

    this.render_list_view();

    var items = new Items();
    this.$el.addClass('loading');
    items.fetch_tree_model_id(this.model.id, {
      success: function(){
        this.render_tree(items);
        this.show_breadcrumb(items);
      }.bind(this)
    });
  },

  render_tree: function(collection){
    this.$el.removeClass('loading');
    this.$el.addClass('open');
    this.model.loaded = true;
    this.open = true;
    this.parent.tabs.render_subtree(this.$('> ul'), collection);
  },

  render_list_view: function(){
    this.parent.tabs.render_list_view(this.model);
  },

  show_preview: function(){
    this.parent.tabs.render_preview(this.model);
  },

  show_breadcrumb: function(collection){
    this.parent.tabs.render_breadcrumb(collection);
  }


});