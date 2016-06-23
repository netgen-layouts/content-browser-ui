'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');

module.exports = Core.View.extend({
  template: 'tree_item',
  tagName: 'li',
  className: 'item',

  events:{
    'click': '$toggle',
    'click a': '$select'
  },

  limit: 3,
  current_page: 1,

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'locations:success', this.load_subtree);
    this.listenTo(this.model, 'children:success', this.unmark_loading);
    this.setup_dom();
    return this;
  },

  setup_dom: function(){
    this.model.get('has_sub_locations') && this.$el.addClass('has_children');
    this.$el.attr({
      'data-id': this.model.id,
      'data-type': this.model.get('type')
    });
  },

  $toggle: function(e){
    e.stopPropagation();

    this.select_tree_item();

    if(this.opened){
      this.unmark_opended();
    }else{
      this.mark_loading();
      this.open();
    }
  },

  $select: function(e){
    e.stopPropagation();
    // if(this.opened){return;}
    this.mark_loading();
    this.select_tree_item();
    this.load_list_view();
    return this;
  },

  open: function(){
    this.mark_opened()
    this.show_preview();
    this.load_list_view();
    this.model.get('has_sub_locations') && this.model.fetch_children();
    return this;
  },

  mark_opened: function(){
    this.$el.addClass('open');
    this.opened = true;
    return this;
  },

  unmark_opended: function(){
    this.$el.removeClass('open');
    this.opened = false;
    return this;
  },

  mark_loading: function(){
    this.$el.addClass('loading');
  },

  unmark_loading: function(){
    this.$el.removeClass('loading');
  },

  select_tree_item: function(){
    $('.tree .selected').removeClass('selected');
    this.$el.addClass('selected');
  },

  load_subtree: function(){
    this.render_tree(this.model.loaded_children);
    return this;
  },

  render_tree: function(collection){
    this.mark_opened();
    this.model.loaded = true;
    this.parent.tabs.render_subtree(this.$('> ul'), collection);
  },

  load_list_view: function(){
    this.parent.tabs.list_items.fetch_list_by_model_id(this.model.id).done(function(){
      this.model.trigger('children:success');
    }.bind(this));
  },

  show_preview: function(){
    this.parent.tabs.render_preview(this.model);
  }


});
