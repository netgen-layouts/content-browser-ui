'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({

  template: 'list_options',

  events: {
    'click .options-dropdown-toggle': '$toggle',
    'change .column-check': '$toggle_table_columns'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    Core.on('browser:click', this.$close_outside.bind(this));
    return this;
  },

  $toggle: function(){
    this.is_open ? this.$close() : this.$open();
  },

  $open: function(){
    this.$el.addClass('open');
    this.is_open = true;
  },

  $close: function(){
    this.$el.removeClass('open');
    this.is_open = false;
  },

  $close_outside: function(e){
    !$(e.target).closest(this.el).length && this.is_open && this.$close();
  },

  $toggle_table_columns: function(e){
    var name = e.target.name,
        $cell = $('[data-name="' + name + '"]');

    $cell.toggleClass('hidden');

    this.collection.save_visibility(name, e.target.checked);
  }

});
