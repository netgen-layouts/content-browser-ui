'use strict';

var BreadcrumbItemView = require('./breadcrumb_item');

module.exports = BreadcrumbItemView.extend({

  $open: function(e){
    e.preventDefault();

    var tabs = this.parent.tabs,
        is_dummy = this.model.get('dummy');

    if(is_dummy){
      tabs.render_search_result();
      tabs.enable_search_panel();
    }else{
      tabs.render_search_result(this.model);
      tabs.disable_search_panel();
    }

  }

});
