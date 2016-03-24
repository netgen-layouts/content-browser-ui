var Core = require('core_boot');
var Breadcrumb = require('../models/breadcrumb');

module.exports = Core.Collection.extend({
  model: Breadcrumb
});
