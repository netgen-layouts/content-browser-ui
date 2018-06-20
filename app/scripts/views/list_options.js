'use strict';

var Core = require('@netgen/layouts-core-ui');
var $ = Core.$;

module.exports = Core.View.extend({

  template: 'list_options',

  events: {
    'click .options-dropdown-toggle': '$toggle',
    'change .column-check': '$toggle_table_columns'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    Core.on('browser:click', this.$close_outside.bind(this));
    this.collection.on('change:visible', this.$toggle_checkbox);
    return this;
  },

  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.items_for_menu = this.collection.for_menu();
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
    e.preventDefault();
    var name = e.target.name,
        $cell = $('[data-name="' + name + '"]');

    $cell.toggleClass('hidden');

    this.collection.save_visibility(name, e.target.checked);
  },

  $toggle_checkbox: function(e){
    console.log(e);
    $('[data-id="' + e.id + '"]').prop('checked', e.attributes.visible);
  }

});
