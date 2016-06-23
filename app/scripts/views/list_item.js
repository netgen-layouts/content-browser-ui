'use strict';

var ListBaseView = require('./list_base');

module.exports = ListBaseView.extend({

  tagName: 'tr',
  className: 'item',

  browse_tab: function(){
    return this.parent.tabs;
  },

  events: {
    'click a': '$open'
  },

  $open: function(e){
    e.preventDefault();
    if(!this.model.has_sub_items()){return;}

    if(this.parent.name === 'search'){
      this.model.collection.fetch_list_by_model_id(this.model.get('location_id'));
      this.disable_search_panel();
    }else{
      //var result = this.parent.tabs.tree_view.click_item_by_id(this.model.id);
      this.parent.tabs.list_items.fetch_list_by_model_id(this.model.get('location_id'));
    }

  },


  disable_search_panel: function(){
    $('.search-left-panel').find('*').prop('disabled', true);
  },

});
