'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');
var Item = require('../models/item');
var SectionItemsView = require('./section_items');
var SearchSectionItemsView = require('./search_section_items');
var TreeView = require('./tree');
var ListRootView = require('./list_root');
var ListView = require('./list');
var PreviewView = require('./preview');
var BreadcrumbView = require('./breadcrumb');

var BreadcrumbSearchItemView = require('./breadcrumb_search_item');
var SearchBreadcrumbView = require('./search_breadcrumb');


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

    this.search_items = new Items();
    this.search_items.browser = this.browser;

    this.listenTo(this.list_items, 'read:success', this.on_list_items_success);
    this.listenTo(this.collection, 'read:success', this.set_preview_height);

    return this;
  },

  render: function(){
    Core.View.prototype.render.apply(this, arguments);
    this.$el.browser_tabs();
    this.setup_list_view();
    this.render_root_items();
    this.render_search_root_items();
    this.render_tree();
    this.load_list_view();
    this.setup_search_list_view();
    this.setup_search_breadcrumb();
    this.setup_breadcrumb();
    // this.set_preview_height();
    return this;
  },

  on_list_items_success: function(){
    this.render_preview(this.list_items.parent_item);
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


    this.list_view.on('render', function(){
      this.render_list_root();
    }.bind(this));

    return this;
  },



  load_list_view: function(model){
    model || (model = this.sections.first());
    this.list_items.fetch_list_by_model_id(model.id)
        .done(function(){
          model.trigger('children:success');
        });
  },

  render_list_root: function(){
    var model = this.list_items.parent_item;
    model.browser = this.browser;
    model.is_root_model = true;

    this.list_root_view = new ListRootView({
      model: model,
      el: '.list .list-root',
      tabs: this
    }).render();


    model.trigger('select');

  },

  setup_breadcrumb: function(){

    this.breadcrumb = new BreadcrumbView({
      collection: this.list_items,
      el: '.breadcrumb-list',
      tabs: this
    }).render();
  },

  render_preview: function(model){
    if(this.preview && this.preview.model === model){return;}
    this.preview && this.preview.model && this.preview.model.trigger('unselect');
    model.trigger('select');
    this.preview = new PreviewView({
      model: model
    });

    this.$('.preview').html(this.preview.render().$el);

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

    // if user click on breadcrumb link we have a model
    if(model){
      this.search_items.fetch_list_by_model_id(model.id);
    }else{
      this.search_items.search_data({
        data: this.search_params()
      });
    }

  },

  search_params: function(){
    return Core._.pick(this.serialize('form').params, 'searchText', 'limit', 'page');
  },


  setup_search_list_view: function(items){
    this.search_list_view = new ListView({
      collection: this.search_items,
      el: '.right-panel .search-list',
      browser: this.browser,
      tabs: this,
      name: 'search'
    });
  },

  render_search_root_items: function(){
    this.root_items_view = new SearchSectionItemsView({
      collection: this.sections,
      tabs: this,
      el: '.search-root-items'
    }).render();

    return this;
  },

  setup_search_breadcrumb: function(){

    this.search_breadcrumb = new SearchBreadcrumbView({
      collection: this.search_items,
      el: '.breadcrumb-search',
      tabs: this
    }).render();
  },

  disable_search_panel: function(){
    this.$('.search-left-panel').find('*').prop('disabled', true);
  },

  enable_search_panel: function(){
    this.$('.search-left-panel').find('*').prop('disabled', false);
  }

});
