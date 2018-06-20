'use strict';

var Core = require('@netgen/layouts-core-ui');
var Locations = require('../collections/locations');
var Columns = require('../collections/columns');
var Breadcrumbs = require('../collections/breadcrumbs');
var Column = require('./column');
var _ = Core._;

module.exports = Core.Model
  .extend({

    content_browser: true,

    initialize: function(){
      Core.Model.prototype.initialize.apply(this, arguments);
      this.extract_custom_params();
      this.on('read:success', this.setup);
      return this;
    },

    fetch: function(options){
      options || (options = {});
      options.data = _.extend({}, options.data, {customParams: this.get('custom_params') });
      return this._super('fetch', [options]);
    },

    setup: function(){
      this.save_default_limit();
      this.save_available_columns();
      return this;
    },

    path: function(){
      return this.get('root_path') + '/config';
    },

    default_location: function(){
      var default_model = this.sections.first();
      default_model && default_model.select();
      return default_model;
    },

    parse: function(response) {
      _.extend(response, _.pick(this.get('overrides'), 'min_selected', 'max_selected', 'has_tree', 'has_search', 'has_preview', 'start_location'));
      this.initialize_root_items(response);
      return response;
    },

    extract_custom_params: function(){
      var custom_params = _.extend({}, this.get('custom_params'));

      _.each(this.get('overrides'), function(value, key) {
        var m = key.match(/^custom(.*)/);
        var param_name;
        if(m){
          param_name = m[1].trim();
          if(param_name !== '' && param_name !== '-'){
            param_name = param_name.charAt(0).toLowerCase() + param_name.slice(1);
            custom_params[param_name] = value;
          }
        }
      });

      this.set({custom_params: custom_params });
      return this;
    },


    is_in_root_item: function(id){
      return this.sections.some(function(item){ return item.id === id; });
    },

    initialize_root_items: function(response){
      if(!response.sections){ return; }

      this.sections = new Locations();
      //this.tree_config = this;
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
      }
    },

    save_default_limit: function(){
      if(!localStorage.getItem('default_limit')){
        localStorage.setItem('default_limit', this.get('default_limit'));
      }
    }

  });
