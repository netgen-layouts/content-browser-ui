'use strict';

var Core = require('@netgen/layouts-ui-core');

module.exports = Core.View.extend({
  template: 'preview',
  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'change:html', this.render);
  },
  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.loading = this.model.get('loading_preview');
    this.context.html =  this.model.get('html');
    return this;
  }
});
