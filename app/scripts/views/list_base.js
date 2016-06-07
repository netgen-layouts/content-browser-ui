'use strict';

var Core = require('core_boot');

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
    return this;
  },

  setup_dom: function(){
    this.$el.attr({
      'data-id': this.model.id,
      'data-type': this.model.type()
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

  $show_preview: function(){
    this.browse_tab().render_preview(this.model);
  },

  $toogle_select: function(){
    if(this.model.is_checked()){
      this.uncheck_item();
      this.model.uncheck();
    }else{
      this.check_item();
      this.model.check();
    }
    Core.trigger('item:check_changed', this.model);
  },

  uncheck_item: function(){
    this.$el.removeClass('selected');
    this.$(':checkbox').prop('checked', false);
  },

  check_item: function(){
    this.$el.addClass('selected');
    this.$(':checkbox').prop('checked', true);
  },

});
