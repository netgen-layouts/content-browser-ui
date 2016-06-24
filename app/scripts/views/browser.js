'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');
var Locations = require('../collections/locations');
var Columns = require('../collections/columns');
var SelectedItemsView = require('./selected_items');
var TreeConfig = require('../models/tree_config');
var BrowserConfig = require('../models/browser_config');
var TabsView = require('./tabs');

module.exports = Core.Modal.extend({

  template: 'browser',

  className: 'browser modal fade loading',

  prevent_auto_render: true,

  events:{
    'click': '$browser_click',
    'click .btn-preview': '$toggle_preview',
    'transitionend .loader': '$loading_done'
  },

  initialize: function(options){
    Core.Modal.prototype.initialize.apply(this, arguments);

    this.tree_config = new TreeConfig(options.tree_config);
    this.disabled_item_ids = options.disabled_item_ids;

    this.tree_collection = new Locations();

    this.selected_collection = new Items();

    this.selected_collection.browser = this;
    this.tree_collection.browser = this;

    this.browser_config = new BrowserConfig({id: 1});
    this.browser_config.fetch();

    this.tree_collection.tree_config = this.selected_collection.tree_config = this.tree_config;

    this.listenToOnce(this.tree_collection, 'read:success', this.on_load);

    this.listenTo(Core, 'browser:check browser:uncheck', this.enable_disable_apply);


    return this;
  },

  $loading_done: function(e){
    this.$('.loader').remove();
  },

  on_load: function(){
    this.render_tabs_view();
    this.enable_disable_apply();
    this.$el.removeClass('loading');
    return this;
  },

  enable_disable_apply: function(){
    var min_selected_is_valid = this.selected_collection.length >= this.tree_config.get('min_selected');
    min_selected_is_valid ? this.enable_apply() : this.disable_apply();
    return this;
  },


  disable_apply: function(){
    this.$('.action_apply').attr('disabled', true);
  },

  enable_apply: function(){
    this.$('.action_apply').attr('disabled', false);
  },

  render_tabs_view: function(){
    var columns = new Columns();
    columns.suffix = this.tree_config.get('root_path');
    columns.fetch();
    console.log(columns);

    this.tabs = new TabsView({
      collection: this.tree_collection,
      el: '.browser-tabs',
      browser: this,
      columns: columns,
      context: {
        preview_visible: this.browser_config.get('preview_visible')
      }
    }).render();

    this.selected_items = new SelectedItemsView({
      collection: this.selected_collection,
      el: '.selected-items',
      browser: this,
    }).render();

  },

  render_selected_items: function(){
    this.selected_items && this.selected_items.render();
  },

  selected_values: function(){
    return this.selected_collection.pluck('value');
  },

  $browser_click: function(){
    Core.trigger('browser:click');
  },

  load_and_open: function(){
    this.open();

    this.tree_config.fetch().done(function(){
      var default_location = this.tree_config.default_location();

      $.when(
        this.tree_collection.fetch_tree_by_model_id(default_location.id)
        //this.preselected_item_ids ? this.selected_collection.fetch_selected_items(this.preselected_item_ids) : true

      ).then(null, function(){
        alert('Error while loading content browser');
      });


    }.bind(this));

    return this;
  },

});
