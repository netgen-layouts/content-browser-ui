'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');
var Columns = require('../collections/columns');
var SelectedItemsView = require('./selected_items');
var TreeConfig = require('../models/tree_config');
var TabsView = require('./tabs');

module.exports = Core.Modal.extend({

  template: 'browser',

  className: 'browser modal fade',

  prevent_auto_render: true,

  events:{
    'click': '$browser_click',
    'click .btn-preview': '$toggle_preview'
  },

  initialize: function(options){
    Core.Modal.prototype.initialize.apply(this, arguments);

    this.tree_config = new TreeConfig(options.tree_config);
    this.disabled_item_ids = options.disabled_item_ids;

    this.tree_collection = options.tree_collection || new Items();
    this.selected_collection = new Items();

    window.tmp = this.selected_collection

    this.selected_collection.browser = this;
    this.tree_collection.browser = this;

    this.tree_collection.tree_config = this.selected_collection.tree_config = this.tree_config;

    // this.listenTo(this.selected_collection, 'check uncheck', this.render_selected_items.bind(this));

    this.on('open', function(){
      this.render_tabs_view();
    }.bind(this));

    return this;
  },

  render_tabs_view: function(){
    var columns = new Columns();
    columns.suffix = this.tree_config.get('root_path');
    columns.fetch();

    this.tabs = new TabsView({
      collection: this.tree_collection,
      el: '.browser-tabs',
      browser: this,
      columns: columns
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
    this.tree_config.fetch().done(function(){
      var default_location = this.tree_config.default_location();

      $.when(
        this.tree_collection.fetch_root_by_model_id(default_location.id)
        //this.preselected_item_ids ? this.selected_collection.fetch_selected_items(this.preselected_item_ids) : true

      ).then(this.open.bind(this), function(){
        alert('Error while loading content browser');
      });


    }.bind(this));

    return this;
  },

});
