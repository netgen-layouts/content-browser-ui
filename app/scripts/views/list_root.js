'use strict';

var ListBaseView = require('./list_base');

module.exports = ListBaseView.extend({
  browse_tab: function(){
    return this.tabs;
  }
});
