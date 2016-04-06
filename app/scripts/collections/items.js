'use strict';

var Core = require('core_boot');
var Item = require('../models/item');
var Breadcrumbs = require('./breadcrumbs');

module.exports = Core.Collection.extend({

  model: Item,

  name: 'Items',

  parse: function(response){
    if(response.children){
      this.path = new Breadcrumbs(response.path);
      var last = this.path.last();
      last && last.set({last: true});
      last && (this.last_model = last);
      this.children_count = response.children_count;
      this.children_limit = localStorage.getItem('default_limit') || Core.g.tree_config.get('default_limit');
      this.children_offset = Math.floor(this.children_count / this.children_limit);
      return response.children;
    }else{
      return response;
    }
  },

  fetch_root_by_model_id: function(id, options){
    this._fetch_data(id, 'categories', options);
  },

  fetch_tree_by_model_id: function(id, options){
    this._fetch_data(id, 'categories', options);
  },

  fetch_list_by_model_id: function(id, options){
    id = id || this.request.read.id;
    options = this.setup_options(options);
    options.data.id = id;
    this._fetch_data(id, 'children', options);
  },

  fetch_list: function(options){
    this.fetch_list_by_model_id(null, options);
  },

  _fetch_data: function(id, postfix, options){
    var url = this.url() + '/' + id + '/' + postfix;
    this.fetch(Core._.extend({
      url: url
    }, options));
  },

  search_data: function(options){
    var url = Core.env.cb_base_url + Core.g.tree_config.get('root_path') +'/search';
    options = this.setup_options(options);
    this.fetch(Core._.extend({
      url: url
    }, options));
  },

  setup_options: function(options){
    options = options || {};
    options.data = Core._.extend({}, options.data, {
      limit: options.data && options.data.limit ? options.data.limit : localStorage.getItem('default_limit'),
      page: options.data && options.data.page ? options.data.page : 1
    });
    return options;
  },

  select_model_by_id: function(id){
    this.each(function(item){
      if(item.id === id){
        item.select();
      }else{
        item.deselect();
      }
    });
  },

  selected_model: function(){
    return this.find(function(item){
      return item.selected;
    });
  }

});
