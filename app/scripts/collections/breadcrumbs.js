var Core = require('@netgen/layouts-ui-core');
var Breadcrumb = require('../models/breadcrumb');

module.exports = Core.Collection.extend({
  model: Breadcrumb
});
