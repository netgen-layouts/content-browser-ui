'use strict';

var Core = require('core_boot');
var SectionItemView= require('./section_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: SectionItemView,
  prevent_auto_render: true

});
