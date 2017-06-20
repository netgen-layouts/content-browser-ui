'use strict';

var Core = require('netgen-core');
var $ = Core.$;
var Items = require('../collections/items');
var Locations = require('../collections/locations');
var Columns = require('../collections/columns');
var SelectedItemsView = require('./selected_items');
var TreeConfig = require('../models/tree_config');
var BrowserConfig = require('../models/browser_config');
var TabsView = require('./tabs');

module.exports = Core.Modal.extend({

  template: 'browser',

  className: 'ngcb modal fade loading',

  prevent_auto_render: true,

  events:{
    'click': '$browser_click',
    'transitionend .loader': '$loading_done'
  },

  initialize: function(options){
    Core.Modal.prototype.initialize.apply(this, arguments);
    this.load_additional_vars();

    this.tree_config = new TreeConfig(options.tree_config);
    this.disabled_item_ids = options.disabled_item_ids;
    //this.preselected_item_ids = options.preselected_item_ids;

    this.tree_collection = new Locations();

    this.selected_collection = new Items();



    this.selected_collection.browser = this;
    this.tree_collection.browser = this;

    this.browser_config = new BrowserConfig({id: 1});
    this.browser_config.fetch();

    // this.list_items.browser = this.browser;
    // this.browser.list_items = this.list_items;

    this.tree_collection.tree_config = this.selected_collection.tree_config = this.tree_config;


    this.listenToOnce(this.tree_collection, 'read:success', this.on_load);

    this.listenTo(Core, 'browser:check browser:uncheck', this.enable_disable_apply);

    return this;
  },

  load_additional_vars: function(){
    var cb_base_path = $('meta[name="ngcb-base-path"]').attr('content');
    cb_base_path && (Core.env.cb_base_path = cb_base_path);
  },

  $loading_done: function(e){
    this.$('.loader').remove();
  },

  on_load: function(){
    !this.tree_config.get('has_tree') && this.$el.addClass('no_tree');
    !this.tree_config.get('has_search') && this.$el.addClass('no_search');

    this.render_tabs_view();
    this.enable_disable_apply();
    this.$el.removeClass('loading');
    return this;
  },

  enable_disable_apply: function(){
    var note;
    var max = this.tree_config.get('max_selected');
    var min = this.tree_config.get('min_selected');
    var count = this.selected_collection.length;
    console.log(min, max);
    var min_selected_is_valid = min === 0 || count >= min;
    var max_selected_is_valid = max === 0 || count <= max;
    max_selected_is_valid && min_selected_is_valid ? this.enable_apply() : this.disable_apply();

    if(!min_selected_is_valid){
      note = 'Please select at least ' + min +  Core.utils.pluralize(' item', min);
    }else if(!max_selected_is_valid){
      note = 'Please select at most ' + max + Core.utils.pluralize(' item', max);
    }else{
      note = '';
    }

    console.log(note);

    this.$('.note').html(note)[note ? 'show' : 'hide'];

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

  $browser_click: function(e){
    Core.trigger('browser:click', e);
  },

  load_and_open: function(){
    this.open();


    this.tree_config.fetch().done(function(){

      this.list_items = new Items();
      this.list_items.browser = this;
      this.list_items.tree_config = this.tree_config;



      var start_location;

      if(this.tree_config.has('start_location')){
        start_location = this.tree_config.get('start_location');
      }

      if(start_location){
        this.list_items.fetch_list_by_model_id(start_location).always(this._load.bind(this))
      }else{
        this._load();
      }




    }.bind(this));

    return this;
  },

  _load: function(xhr, status){
    this.sections = this.tree_config.sections;
    var default_location;

    if(status !== 'error' && this.list_items.path){
      default_location = this.list_items.path.first();
    }else{
      this.tree_config.set({start_location: false});
      default_location = this.tree_config.default_location();
    }
    this.sections.get(default_location.id).set('default', true);

    $.when(
      this.tree_collection.fetch_tree_by_model_id(default_location.id)
    //, this.preselected_item_ids ? this.selected_collection.fetch_selected_items(this.preselected_item_ids) : true

    ).then(function(){


      if(this.tree_config.get('start_location') && this.list_items.path.length > 1){
        var tree_model = this.tree_collection.get(this.list_items.path.models[1].id);
        var ids = this.list_items.path.pluck('id');
        ids.shift();
        ids.shift();

        if(tree_model){
          tree_model.trigger('open_tree:' + tree_model.id, ids);
        }
      }

    }.bind(this), function(){
      alert('Error while loading content browser');
    });
    return this;
  },

});
