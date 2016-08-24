'use strict';

var Core = require('core');
var TreeItemView = require('./tree_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: TreeItemView,

  click_item_by_id: function(id){
    var $item = $('.tree li[data-id="' + id + '"] > a');
    if($item.length === 0){ return false; }
    $item.trigger('click');
    return  this;
  }

});
