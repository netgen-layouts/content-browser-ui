'use strict';

var Core = require('@netgen/layouts-core-ui');
var SectionItemView= require('./section_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: SectionItemView,
  prevent_auto_render: true,

  events : {
    'change' : '$open_root_location'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.listenTo(Core, 'browser:select_section', this.select_section);
    return this;
  },

  $open_root_location: function(e){
    e.preventDefault();
    var model = this.$('option:selected').data('_view').model;
    this.select_section(model);
  },


  select_section: function(model){
    // select root item by id
    this.collection.select_model_by_id(model.id);

    this.tabs.list_items.fetch_list_by_model_id(model.id);
    this.tabs.collection.fetch_tree_by_model_id(model.id);

    return this;
  },

});
