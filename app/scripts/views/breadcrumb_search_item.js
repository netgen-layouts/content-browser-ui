'use strict';

var Item = require('../models/item');
var BreadcrumbItemView = require('./breadcrumb_item');

module.exports = BreadcrumbItemView.extend({

  $open: function(e){
    e.preventDefault();

    var tabs = this.parent.tabs;

    if(this.model.get('name').indexOf(Item.BREADCRUMB_TEXT) !== -1){
      tabs.render_search_tab();
      tabs.enable_search_panel();
    }else{
      tabs.render_search_tab(this.model);
      tabs.disable_search_panel();
    }

  }

});
