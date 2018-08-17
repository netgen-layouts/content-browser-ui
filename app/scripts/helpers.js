'use strict';

var Core = typeof window !== 'undefined' ?
  require('@netgen/layouts-ui-core/app/scripts/core_base') :
  require('@netgen/layouts-ui-core/app/scripts/core_namespace');

var _ = require('underscore');
var TagHelper = require('@netgen/layouts-ui-core/app/scripts/tag_helper');

var safe = function(){
  return TagHelper.safe.apply(this, arguments);
};

var render_partial = function(template, context){
  return TagHelper.render_partial.call(this, template, context);
};

module.exports = {

  get_column: function(model, property_name){
    var columns = model.get('columns');
    return columns ? columns[property_name] : '';
  },

  /**
     * TODO !
     *
     * @method paginate
     * @param  {String} id
     * @param  {Object} options
     * @return {String}
     */
  paginate: function(id, options){
    var view = options.hash.context ? options.hash.context.view : this.view;
    var view_pager = view.pagers[id];
    if(!view_pager.pager){return '';}

    var context = view_pager.pager;
    context.id = id;
    if(options.hash.auto_hide){
      context.show = context.total_pages > 1;
    }else{
      context.show = true;
    }

    context.pages =  view_pager.pager.render();
    context.prev_disabled = !context.prev;
    context.next_disabled = !context.next;

    return safe(render_partial('paginator', context));
  },


  /**
   * Used as handlebars function. For existing view.pager creates dropdown to choose number of collection
   * items displayed per page. On item select triggers collection.fetch event to update pagination
   * (number of pages, items per page, ...)
   * @method pages_selector
   * @param  {String} id
   * @return {String}
   */
  pages_selector: function(id){
    console.log(this);
    var view = this.view;
    var view_pager = view.pagers[id];
    if(!view_pager.pager){return '';}
    var collection = view_pager.items;
    var context = {
      id: _.uniqueId('pages_selector'),
      limit: collection.children_limit,
      collection: [
        {id: 5, name: 5},
        {id: 10, name: 10},
        {id: 25, name: 25},
        //{id: 50, name: 50}
      ]
    };

    _.defer(function(){
      Core.$('#'+context.id).on('change', function(){
        var data  = {
          page: 1,
          limit: Core.$(this).val()
        };

        if(view.name === 'search' && !view.collection.path.length){
          collection.search_data({
            data: _.extend(data, view.tabs.search_params())
          });
        }else{
          collection.fetch_list({
            data: data
          });
        }
      });
    });

    return safe(render_partial('pages_selector', context));
  },
};
