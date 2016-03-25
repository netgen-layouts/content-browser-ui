'use strict';

var Core = require('core_boot');
var Items = require('../collections/items');
var Columns = require('../collections/columns');
var Breadcrumbs = require('../collections/breadcrumbs');
var Column = require('./column');

module.exports = Core.Model
  .extend({

    content_browser: true,

    path: function(){
      return this.get('root_path') + '/config';
    },

    default_location: function(){
      var default_model = this.sections.first();
      default_model && default_model.select();
      return default_model;
    },

    parse: function(response) {
      this.initialize_root_items(response);
      return response;
    },

    is_in_root_item: function(id){
      return this.sections.some(function(item){ return item.id === id; });
    },

    initialize_root_items: function(response){
      if(!response.sections){ return; }

      this.sections = new Items();
      this.sections.add(response.sections);
      this.sections.models.forEach(function(model){
        // we use this property for initial root list item
        model.is_root_model = true;
        model.path = new Breadcrumbs([{
          id: model.id,
          name: model.get('name'),
          last: true // for initial breadcrumb
        }]);
      });
      delete(response.sections);
    },

    save_available_columns: function(){

      if(!localStorage.getItem('table_column_' + this.get('root_path'))){
        var default_columns = this.get('default_columns');
        var available_columns = this.get('available_columns');

        var columns = new Columns({});
        columns.suffix = this.get('root_path');
        Core._.each(available_columns, function(item, index){
          var column = new Column({
            column_id: item.id,
            name: item.name,
            visible: default_columns.indexOf(item.id) !== -1,
            order: index
          });
          columns.add(column);
          column.save();

        });

        localStorage.setItem('default_saved', true);
      }
    },

  });