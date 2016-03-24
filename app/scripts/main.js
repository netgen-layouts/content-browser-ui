'use strict';

require('./templates_loader');
var Core = require('core_boot');

var TreeConfig = require('./models/tree_config');
var Items = require('./collections/items');
var Browser = require('./views/browser');

Core.g.tree_config = new TreeConfig({
  root_path: 'ezcontent' // ezcontent, ezlocation, eztags
});

window.Core = Core;

var _open_browser = function(){

  var default_location = Core.g.tree_config.default_location();

  var tree_collection = new Items();

  var browser = new Browser({
    tree_collection: tree_collection,
    title: 'Content browser'
  }).on('apply', function(){
    alert(browser.selected_values());
  }).open();

  default_location && tree_collection.fetch_root_model_id(default_location.id);
};

Core.Backbone.$.when(
  Core.g.tree_config.fetch()
).then(Core.g.tree_config.save_available_columns.bind(Core.g.tree_config)
).then(_open_browser);

