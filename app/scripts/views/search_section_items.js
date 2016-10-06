'use strict';

var Core = require('netgen-core');
var SectionItemView= require('./section_item');

module.exports = Core.View.extend({
  extend_with: ['tabs'],
  ViewItem: SectionItemView,
  prevent_auto_render: true
});
