'use strict';

var Core = require('netgen-core');
var MixinTree = require('netgen-core/app/scripts/models/mixin/tree');

module.exports = Core.Model
  .extend(MixinTree)
  .extend({
    content_browser: true,

    //For tree
    fetch_children: function(){
      var items = new this.collection.constructor();
      items.browser = this.collection.browser;
      this.loaded_children = items;

      items.on('locations:success', function(e){
        this.trigger('locations:success');
      }.bind(this));

      items.on('locations:error', function(e){
        this.trigger('locations:error');
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
