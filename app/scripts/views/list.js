'use strict';

var Core = require('core_boot');
var ListItemView = require('./list_item');

module.exports = Core.View.extend({

  template: 'list',

  extend_with: ['browser', 'tabs', 'name'],

  view_items_el: 'tbody',

  name: 'list',

  ViewItem: ListItemView,

  events: {
    'contextmenu': '$show_dropdown_menu',
    'change .column-check': '$toggle_table_columns',
    'change .pages_selector': '$save_default_limit',
    'click .pagination a': '$change_page'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);

    this.context.columns = this.tabs.columns;

    Core.on('browser:click', this.hide_dropdown_menu);

    this.listenTo(this.collection, 'reset', this.render);

    return this;
  },

  render: function(){
    this.pager('listview_collection', this.collection);
    Core.View.prototype.render.apply(this, arguments);
  },

  $show_dropdown_menu: function(e){
    e.preventDefault();
    this.$('.dropdown-menu').css({
      display: 'block',
      left:  e.pageX - this.$el.offset().left,
      top: e.pageY - this.$el.offset().top
   });
  },

  hide_dropdown_menu: function(){
    $('.dropdown-menu').hide();
  },

  $toggle_table_columns: function(e){
    var name = e.target.name,
        $th = $('th[data-name="' + name + '"]'),
        $td = $('td[data-name="' + name + '"]');

    if(e.target.checked){
      $th.removeClass('hidden');
      $td.removeClass('hidden');
    }else{
      $th.addClass('hidden');
      $td.addClass('hidden');
    }

    this.tabs.columns.save_visibility(name, e.target.checked);

    this.hide_dropdown_menu();
  },

  $save_default_limit: function(e){
    localStorage.setItem('default_limit', $(e.target).val());
  },

  $change_page: function(e){
    this.paginate(e);
  }

});
