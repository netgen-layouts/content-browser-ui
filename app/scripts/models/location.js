'use strict';

var Core = require('core_boot');
var MixinTree = require('core_tree');
var _ = require('underscore');

module.exports = Core.Model
  .extend(MixinTree)
  .extend({
    content_browser: true,

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




    select: function(){
      this.selected = true;
    },

    deselect: function(){
      this.selected = false;
    },

  });
