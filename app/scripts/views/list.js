'use strict';

var Core = require('@netgen/layouts-core-ui');
var Pager = require('../components/pager');
var ListItemView = require('./list_item');
var $ = Core.$;
var _ = require('underscore');

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
  },

  pager: function(name, items, options){
    this.pagers || (this.pagers = {});
    this.pagers[name] || (this.pagers[name] = {});
    var view_pager = this.pagers[name],
        current_page,
        current_offset,
        total,
        limit,
        pager,
        sliced,
        is_array = _.isArray(items);

    if(is_array){
      current_page = options.current_page;
      limit = options.limit;
      total = items.length;
    }else{
      if(items && !items.request){
        return items;
      }
      if(items){
        total = items.children_count;
        current_offset = items.children_offset;
        limit = items.children_limit;
      }else{
        current_offset = 0;
      }
    }

    if(view_pager.pager && view_pager.pager.total && is_array){
      pager = view_pager.pager;
      pager.total = total;
      pager.calculate();
      if(pager.current_page > pager.total_pages){
        pager.current_page = pager.total_pages;
      }
      pager.calculate();
    }else{
      pager = new Pager({
        current_page: this.collection.request.read.page,
        current_offset: current_offset,
        total: total,
        limit: limit
      });
    }

    if(is_array){
      sliced = items.slice(pager.current_offset, pager.current_offset+pager.limit);
    }else{
      sliced = items;
    }

    view_pager = {
      pager: pager,
      items: sliced
    };
    this.pagers[name] = view_pager;
    return sliced;
  },

  paginate: function(e, search_data){
    e.preventDefault();

    var $target = $(e.target);
    var pagination_id = $target.closest('[data-pagination-id]').data('pagination-id');

    var pager_wrapper = this.pagers[pagination_id];
    var pager = pager_wrapper.pager;
    var collection = pager_wrapper.items;

    var is_prev_link = $target.hasClass('prev');
    var is_next_link = $target.hasClass('next');

    if(is_prev_link && !pager.prev || is_next_link && !pager.next){
      return;
    }

    var page = parseInt($target.text(), 10);
    var offset = pager.current_offset, new_offset = pager.page(page).offset;

    if(is_prev_link && pager.prev){
      page = pager.current_page - 1;
    }else if(is_next_link && pager.next){
      page = pager.current_page + 1;
    }

    if(offset !== new_offset){

      var data = {
        limit: collection.children_limit,
        page: page
      };

      if(search_data && !collection.path.length){
        collection.search_data({
          data: Core._.extend(data, search_data)
        });
      }else{
        collection.fetch_list({
          data: data
        });
      }
    }
  }
});
