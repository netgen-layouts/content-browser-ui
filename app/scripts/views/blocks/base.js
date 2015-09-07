
define(['underscore', 'view', 'views/modal', 'views/form_modal', 'app'], function(_, View, Modal, FormModal, App){
  'use strict';

  return View.extend({

    initialize: function(){
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change', this.setup_dom_element);
      this.on('render', this.update_positions);
      this.listenTo(this.model, 'delete:success', this.on_destroy);
      !this.model.isNew() && this.model.fetch();
    },

    events: {
      'click > .block_actions .action-edit': '$edit',
      //'dblclick > .block_actions .action-destroy': '$fast_destroy'
       'click > .block_actions .action-destroy': '$destroy'
    },

    setup_dom_element: function(){
      this.model.is_in_section() && this.$el.attr('data-in-section', '');
      this.$el
        .attr('data-block', '')
        .attr('data-type', this.model.get('template').get('kind'));
      return this;
    },

    render: function(){
      View.prototype.render.apply(this, arguments);
      this.$el
        .html(this.model.get('html'))
        .prepend(JST['block_actions'](this.context)); // jshint ignore:line
      return this;
    },

    $section_el: function(){
      return this.$el.parents('[data-type="Section"]');
    },

    is_in_section: function(){
      return this.$section_el().length;
    },

    section: function(){
      return this.is_in_section() && this.$section_el().data('_view');
    },

    is_section: function(){
      return this.model.is_section();
    },


    $edit: function(){

      new FormModal({
        form_namespace: this.form_namespace,
        model: this.model
      });

      this.model.fetch({via: 'edit'});

      return this;
    },

    update_positions: function(){
      console.warn('IN SECTION? ', this.is_in_section());
      if(this.model.changed.id){
        console.info('Block base: update_positions');
        if(this.is_in_section()){
          console.info('in section: save_positions');
          this.section().save_positions();
          return;
        }else{
          App.trigger('positions:update');
        }
      }
    },

    $destroy: function(){
      var self = this;
      new Modal({
        body: 'Are you sure you want to delete?',
        context: { title: 'Confirm' }
      }).on('apply', function(){
        console.log('View destroy model', self.model.attributes);
        self.model.destroy();
      }).open();
    },

    on_destroy: function(){
      var is_in_section = this.is_in_section(),
          section = this.section();

      this.remove();
      is_in_section && section.trigger('block:remove');
      App.trigger('positions:update');
    },

    $fast_destroy: function(){
      this.remove();
      this.model.destroy();
      App.trigger('positions:update');
    }

  });

});
