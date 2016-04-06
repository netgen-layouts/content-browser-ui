'use strict';

var ListBaseView = require('./list_base');
var Items = require('../collections/items');

module.exports = ListBaseView.extend({

  tagName: 'tr',

  className: 'item',

  browse_tab: function(){
    return this.parent.tabs;
  },

  events:{
    'click a': '$open'
  },

  $open: function(e){
    e.preventDefault();
    if(this.model.has_children()){
      if(this.parent.name === 'search'){
        this.render_search_result();
      }else{
        var result = this.parent.tabs.tree_view.click_item_by_id(this.model.id);
        if(!result){
          this.render_list_view();
        }
        this.setup_root_model();
      }
    }
  },

  render_search_result: function(){
    this.parent.tabs.render_search_result(this.model);
    this.disable_search_panel();
  },

  disable_search_panel: function(){
    $('.search-left-panel').find('*').prop('disabled', true);
  },

  render_list_view: function(){
    this.parent.tabs.render_list_view(this.model);
  },

  setup_root_model: function(){
    this.parent.tabs.root_model = this.model;
  }

});
