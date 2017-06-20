'use strict';

var Core = require('netgen-core');
var Location = require('../models/location');
var _ = Core._;

module.exports = Core.Collection
  .extend({
    model: Location,
    name: 'Locations',

    fetch: function(options){
      options || (options = {});
      console.log(options, this);
      options.data = _.extend({}, options.data, {customParams: this.browser.tree_config.get('custom_params') });
      return this._super('fetch', [options]);
    },

    parse: function(response){
      return response.children;
    },


    url: function(){
      return Core.env.cb_api_url(this.browser.tree_config.get('root_path') + '/browse');
    },

    fetch_tree_by_model_id: function(id, options){
      return this._fetch_data(id, 'locations', options);
    },

    _fetch_data: function(id, postfix, options){
      var url = this.url() + '/' + id + '/' + postfix;

      return this.fetch(Core._.extend({
        via: postfix,
        url: url
      }, options));
    },



    // Sections ========================================================


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
