'use strict';

var Core = require('core_boot');
var TreeItemView = require('./tree_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: TreeItemView,
  // prevent_auto_render: true,

  click_item_by_id: function(id){
    var $item = $('.tree li[data-id="' + id + '"] > a');
    if($item.length === 0){ return false; }
    $item.trigger('click');
    return  this;
  }

});
