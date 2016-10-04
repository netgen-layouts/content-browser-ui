'use strict';

var Browser = require('../views/browser');
var Core = require('core');
var $ = Core.$;
var _ = Core._;

function MultipleBrowse(el, opts) {
  opts || (opts = {});
  this.$el = $(el);
  var data = this.$el.data();
  this.input_template = data.browserPrototype;
  this.$items = this.$el.find('.items');
  var overrides = $.extend({}, data, opts.overrides);
  this.$name = this.$el.find('.js-name');
  this.$input = this.$el.find('input');
  this.$trigger = this.$el.find('.js-trigger');


  this.browser_opts = $.extend({
    tree_config: {
      root_path: data.browserConfigName,
      overrides: overrides
    },
  }, opts);

  this.setup_events();
}


MultipleBrowse.prototype.preselected_item_ids = function() {
  return this.$items.find('input').map(function(){
    return parseInt($(this).val(), 10);
  }).get();
};


MultipleBrowse.prototype.setup_events = function() {
  this.$el.on('click', '.js-trigger', this.$change.bind(this));
  this.$el.on('click', '.js-remove', this.$remove.bind(this));
};


MultipleBrowse.prototype.$change = function(e){
  e.preventDefault();
  var self = this;
  this.browser_opts.disabled_item_ids = this.preselected_item_ids();
  this.browser = new Browser(this.browser_opts).on('apply', function(){
    self.$items.append(self.render(this.selected_collection));
    self.trigger_change();
  }).load_and_open();
};


MultipleBrowse.prototype.trigger_change = function(){
  this.$el.trigger('browser:change', {instance: this, browser: this.browser});
};

MultipleBrowse.prototype.$remove = function(e){
  e.preventDefault();
  $(e.target).closest('.item').remove();
  this.trigger_change();
};

MultipleBrowse.prototype.render = function(collection){
  var html = collection.map(function(model){
    return this.render_one(model);
  }.bind(this));
  return html;
};


MultipleBrowse.prototype.render_one = function(model){
  var stamp = _.uniqueId();
  var $item = $(this.input_template.replace(/__name__/g, stamp));
  $item.find('.name').text(model.get('name'));
  $item.find('input').val(model.get('id'));
  return $item;
};




$.fn.multiple_browse = function (opts) {
  return $(this).each(function(){
    var $this = $(this);
    if($this.data('multiple_browse')){ return; }
    var instance = new MultipleBrowse(this, opts);
    $this.data('multiple_browse', instance);
  });
};
