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

    this.listenTo(Core, 'browser:check', function(value){

       if(this.model.get('value') === value){
         console.log(this);
         this.check_item();
       }
    });

    this.listenTo(Core, 'browser:uncheck', function(value){
      // console.log(this.model.get('value'), model.get('value'))
      if(this.model.get('value') === value){
         console.log(this);
         this.uncheck_item();
       }
    });

    // this.listenTo(this.model.selected_collection(), 'check', function(model){
    //   this.model.get('value') === model.get('value') && this.check_item();
    // });
    // this.listenTo(this.model.selected_collection(), 'uncheck', function(model){
    //   this.model.get('value') === model.get('value') && this.uncheck_item();
    // });

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

  $show_preview: function(){
    this.browse_tab().render_preview(this.model);
  },

  $toogle_select: function(){
    console.log('toggle_select', this.model.is_checked());
    this.model.is_checked() ? this.model.uncheck() : this.model.check();
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
