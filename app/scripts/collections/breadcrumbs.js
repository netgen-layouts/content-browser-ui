var Core = require('@netgen/layouts-core-ui');
var Breadcrumb = require('../models/breadcrumb');

module.exports = Core.Collection.extend({
  model: Breadcrumb
});
