'use strict';

var Core = require('core');

module.exports = Core.View.extend({
  template: 'preview',
  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.html =  this.model.get('html');
    return this;
  },
});
