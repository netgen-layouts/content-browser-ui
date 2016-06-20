'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');
var Item = require('../models/item');
var SectionItemsView = require('./section_items');
var TreeView = require('./tree');
var ListRootView = require('./list_root');
var ListView = require('./list');
var PreviewView = require('./preview');
var BreadcrumbView = require('./breadcrumb');
var BreadcrumbSearchItemView = require('./breadcrumb_search_item');

module.exports = Core.View.extend({

  extend_with: ['browser', 'columns'],

  template: 'tabs',

  prevent_auto_render: true,

  events:{
    'click .btn-preview': '$toggle_preview',
    'submit form': '$search'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.sections = this.browser.tree_config.sections;

    this.list_items = new Items();
    this.list_items.tree_config = this.browser.tree_config;
    this.list_items.browser = this.browser;

    this.listenTo(this.list_items, 'read:success', this.on_list_items_success);
    // this.listenTo(this.list_items, 'all', function(e){
    //   console.log(e);
    // });
    this.listenTo(this.collection, 'read:success', this.set_preview_height);
    // this.listenToOnce(this.collection, 'read:success', this.render_browse_tab);
    // this.listenTo(Core, 'browser:select_item', this.render_list_view)
    return this;
  },

  render: function(){
    Core.View.prototype.render.apply(this, arguments);
    this.$el.browser_tabs();
    this.setup_list_view();
    this.render_root_items();
    this.render_search_root_items();
    this.render_tree();
    this.render_list_view();
    // this.set_preview_height();
    return this;
  },


  render_root_items: function(){
    this.root_items_view = new SectionItemsView({
      collection: this.sections,
      tabs: this,
      el: '.root-items'
    }).render();

    return this;
  },

  render_tree: function(){
    this.tree_view = new TreeView({
      collection: this.collection,
      tabs: this,
      el: '.tree'
    }).render();

    return this;
  },

  render_subtree: function(el, items){
    var collection = items;

    this.tree_view = new TreeView({
      collection: collection,
      tabs: this,
      el: el || '.tree'
    }).render();

    return this;
  },


  setup_list_view: function(){
    this.list_view = new ListView({
      collection: this.list_items,
      el: '.right-panel .list',
      browser: this.browser,
      tabs: this,
      paginate: true
    });

    //Root model
    this.list_view.root_model = this.sections.selected_model();

    this.list_view.on('render', function(){
      this._render_list_root(this.list_view.root_model);
    }.bind(this));

    return this;
  },

  on_list_items_success: function(){
    this.render_breadcrumb(this.list_items);
    return this;
  },


  render_list_view: function(model){
    this.list_view.root_model = this.sections.selected_model();
    var items = this.list_view.collection;
    model || (model = this.list_view.root_model);
    this.list_items.fetch_list_by_model_id(model.id)
        .done(function(){
          model.trigger('children:success');
        });
  },

  _render_list_root: function(model){
    var root_model = this.root_model || model;
    root_model && (root_model.is_root_model = true);
    this.render_list_root(root_model);
    this.root_model = null;
  },

  render_list_root: function(model){
    model.browser = this.browser;

    this.list_root_view = new ListRootView({
      model: model,
      el: '.list .list-root',
      tabs: this
    }).render();

  },

  render_breadcrumb: function(collection){
    this.empty_view(this.breadcrumb);
    this.breadcrumb = new BreadcrumbView({
      collection: collection.path,
      el: '.breadcrumb-list',
      tabs: this
    }).render();
  },

  render_preview: function(model){
    this.empty_view(this.preview);
    this.preview = new PreviewView({
      context: {
        html: model.get('html') || '<h3>' + model.get('name') + '</h3>'
      },
      'el': '.preview'
    }).render();
    !this.browser.browser_config.get('preview_visible') && this.$('.preview-panel').hide();
  },

  $toggle_preview: function(){
    this.$('.preview-panel').toggle();
    this.$('.btn-preview .fa').toggleClass('fa-toggle-on').toggleClass('fa-toggle-off');
    this.$('.preview-panel').is(':visible') ? this.browser.browser_config.save('preview_visible', true) : this.browser.browser_config.save('preview_visible', false);
  },

  /* Search */
  $search: function(e){
    e.preventDefault();

    this.render_search_result();

    return false;
  },

  render_search_result: function(model){
    var items = new Items();
    items.browser = this.browser;
    // if user click on breadcrumb link we have a model
    if(model){
      items.fetch_list_by_model_id(model.id, {
        success: function(){
          this.search_success(items);
        }.bind(this)
      });
    }else{
      items.search_data({
        data: this.search_params(),
        success: function(){
          this.search_success(items);
        }.bind(this)
      });
    }

  },

  search_params: function(){
    return Core._.pick(this.serialize('form').params, 'searchText', 'limit', 'page');
  },

  empty_view: function(view){
    view && view.empty();
  },

  search_success: function(items){
    this.render_search_list_view(items);
  },

  render_search_list_view: function(items){
    this.empty_view(this.search_list_view);
    this.search_list_view = new ListView({
      collection: items,
      el: '.right-panel .search-list',
      browser: this.browser,
      tabs: this,
      name: 'search'
    });

    this.render_search_breadcrumb(items);
  },

  render_search_root_items: function(){
    this.root_items_view = new SectionItemsView({
      collection: this.sections,
      tabs: this,
      'el': '.search-root-items'
    }).render();

    return this;
  },

  render_search_breadcrumb: function(collection){
    this.empty_view(this.search_breadcrumb);

    this.change_breadcrumb_home(collection.path.first());

    this.search_breadcrumb = new BreadcrumbView({
      collection: collection.path,
      'el': '.breadcrumb-search',
      tabs: this,
      ViewItem: BreadcrumbSearchItemView
    }).render();
  },

  change_breadcrumb_home: function(model){
    model && model.set({ name: Item.BREADCRUMB_TEXT + ' "' + this.$('[name="searchText"]').val() + '"'});
  },

  disable_search_panel: function(){
    this.$('.search-left-panel').find('*').prop('disabled', true);
  },

  enable_search_panel: function(){
    this.$('.search-left-panel').find('*').prop('disabled', false);
  }

});
