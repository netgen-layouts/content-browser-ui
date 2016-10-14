'use strict';

var Core = require('netgen-core');

module.exports = Core.View.extend({
  template: 'preview',
  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.html =  this.model.get('html');
    return this;
  },
});
