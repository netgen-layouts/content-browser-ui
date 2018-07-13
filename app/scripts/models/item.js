'use strict';

var Core = require('@netgen/layouts-core-ui');
var Env = require('../environments/default');
var MixinTree = require('./mixin/tree');
var _ = Core._;

module.exports = Core.Model
  .extend(MixinTree)
  .extend({

    idAttribute: 'value',

    api_url: Env.cb_api_url,

    index: [
      ['value']
    ],

    path: function(){
      return this.collection.tree_config.get('root_path') +  '/browse';
    },

    has_sub_items: function(){
      return this.attributes.has_sub_items;
    },


    can_show_children: function(){
      return this.attributes.has_sub_items && !this.is_root_model;
    },


    short_name: function(){
      return this.get('name').length > 27 ? this.get('name').substring(0, 27) + '...' : this.get('name');
    },

    select: function(){
      this.selected = true;
    },

    deselect: function(){
      this.selected = false;
    },

    check: function(){
      this.handle_single_mode();
      this.selected_collection().add(this.clone());
      Core.trigger('browser:check', this.get('value'));
      return this;
    },

    uncheck: function(){
      this.selected_collection().remove(this.clone());
      Core.trigger('browser:uncheck', this.get('value'));
      return this;
    },


    handle_single_mode: function(){
      var first,
          max = this.get_browser().tree_config.get('max_selected');
      if(max !== 1){return;}
      first = this.selected_collection().first();
      first && first !== this && first.uncheck();
    },

    is_checked: function(){
      return this.prechecked() || this.selected_collection().where({value: this.get('value')}).length;
    },


    prechecked: function(){
      return _.contains(this.get_browser().disabled_item_values, this.get('value'));
    },

    is_disabled: function(){
      var not_selectable = !this.get('selectable');
      return not_selectable || this.prechecked();
    },

    get_browser: function(){
      return this.browser || (this.collection && this.collection.browser);
    },

    selected_collection: function(){
      return this.get_browser().selected_collection;
    },

    do_fetch_preview: function(url){
      this.set('loading_preview', true)
      var url = Env.cb_api_url(this.get_browser().tree_config.get('root_path') + '/render/' + this.get("value"));

      Core.$.get(url).done(function(response){
        this.get_browser().preview_cache[this.get("value")] = response;
        this.set('loading_preview', false)
        this.set('html', response);
      }.bind(this));
    },

    fetch_preview: function(){
      if (!this.get_browser()){
        this.set('html', "");

      } else {
        var cachedValue = this.get_browser().preview_cache[this.get("value")];

        cachedValue && this.set("html", cachedValue);

        !this.get('html') && this.do_fetch_preview();
      }

      return this;
    }
  });
