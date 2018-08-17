'use strict';

var Core = require('@netgen/layouts-ui-core');
var Env = require('../environments/default');
var MixinTree = require('./mixin/tree');

module.exports = Core.Model
  .extend(MixinTree)
  .extend({
    api_url: Env.cb_api_url,

    //For tree
    fetch_children: function(){
      var items = new this.collection.constructor();
      items.browser = this.collection.browser;
      this.loaded_children = items;

      items.on('locations:success', function(e){
        this.trigger('locations:' + this.id + ':success');
      }.bind(this));

      items.on('locations:error', function(e){
        this.trigger('locations:' + this.id + ':error');
      }.bind(this));

      return items.fetch_tree_by_model_id(this.id);
    },




    select: function(){
      this.selected = true;
    },

    deselect: function(){
      this.selected = false;
    },

  });
