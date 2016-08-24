var Core = require('core');
var Breadcrumb = require('../models/breadcrumb');

module.exports = Core.Collection.extend({
  model: Breadcrumb
});
