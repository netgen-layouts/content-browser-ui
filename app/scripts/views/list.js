'use strict';

var Core = require('core_boot');
var ListItemView = require('./list_item');

module.exports = Core.View.extend({

  template: 'list',

  extend_with: ['browser', 'tabs', 'name'],

  view_items_el: '.children',

  name: 'list',

  ViewItem: ListItemView,


  events: {
    'change .pages_selector': '$save_default_limit',
    'click .pagination a': '$change_page'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.context.columns = this.tabs.columns;
    this.listenTo(this.collection, 'reset', this.render);
    return this;
  },

  render: function(){
    this.pager('listview_collection', this.collection);
    Core.View.prototype.render.apply(this, arguments);
    return this;
  },

  $save_default_limit: function(e){
    localStorage.setItem('default_limit', $(e.target).val());
  },

  $change_page: function(e){
    if(this.name === 'search'){
      this.paginate(e, this.tabs.search_params());
    }else{
      this.paginate(e);
    }
  }

});
