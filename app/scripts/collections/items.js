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
      return response.children;
    }else{
      return response;
    }
  },

  fetch_root_model_id: function(id, options){
    this._fetch_data(id, 'categories', options);
  },

  fetch_tree_model_id: function(id, options){
    this._fetch_data(id, 'categories', options);
  },

  fetch_list_model_id: function(id, options){
    this._fetch_data(id, 'children', options);
  },

  _fetch_data: function(id, postfix, options){
    var url = this.url() + '/' + id + '/' + postfix;
    this.fetch(Core._.extend({
      url: url
    }, options));
  },

  search_data: function(options){
    var url = Core.env.cb_base_url + Core.g.tree_config.get('root_path') +'/search';
    this.fetch(Core._.extend({
      url: url
    }, options));
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
