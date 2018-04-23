'use strict';

var Core = require('netgen-core');

module.exports = Core.View.extend({
  template: 'preview',
  initialize: function(){
    Core.View.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'change:html_new', this.render);
  },
  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.loading = !this.model.get('html_new');
    this.context.html =  this.model.get('html');
    return this;
  }
});
