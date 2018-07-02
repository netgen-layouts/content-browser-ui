'use strict';

var Core = require('netgen-core');

module.exports = Core.View.extend({

  extend_with: ['tabs'],

  template: 'list_item',

  events:{
    'click': '$show_preview',
    'click input': '$toogle_select'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.setup_dom();
    this.model.is_checked() && this.check_item();
    this.context.columns = this.browse_tab().columns;

    this.listenTo(Core, 'browser:check', function(value){
      this.model.get('value') === value && this.check_item();
    });

    this.listenTo(Core, 'browser:uncheck', function(value){
      this.model.get('value') === value && this.uncheck_item();
    });

    this.listenTo(this.model, 'select', this.mark_selected);
    this.listenTo(this.model, 'unselect', this.unmark_selected);

    !this.model.get('visible') && this.$el.addClass('item-hidden');

    return this;
  },

  setup_dom: function(){
    this.$el.attr({
      'data-id': this.model.id,
      'data-type': this.model.get('type')
    });
  },

  render: function(){
    Core.View.prototype.render.apply(this, arguments);
    this.hide_columns_by_visibility();
    return this;
  },

  hide_columns_by_visibility: function(){
    var columns = this.browse_tab().columns.invisibles();
    columns.forEach(function(item){
      this.$('td[data-name="' + item.get('name') +  '"]').addClass('hidden');
    }.bind(this));
  },

  mark_selected: function(){
    this.$el.addClass('selected');
  },

  unmark_selected: function(){
    this.$el.removeClass('selected');
  },

  $show_preview: function(){
    this.browse_tab().render_preview(this.model);
  },

  $toogle_select: function(){
    this.model.is_checked() ? this.model.uncheck() : this.model.check();
  },

  uncheck_item: function(){
    // this.$el.removeClass('selected');
    this.$(':checkbox').prop('checked', false);
  },

  check_item: function(){
    // this.$el.addClass('selected');
    this.$(':checkbox').prop('checked', true);
  },

});
