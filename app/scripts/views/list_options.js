'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({

  template: 'list_options',

  events: {
    'change .column-check': '$toggle_table_columns'
  },

  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.context.columns = this.model;
    return this;
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

    this.model.save_visibility(name, e.target.checked);

  }

});
