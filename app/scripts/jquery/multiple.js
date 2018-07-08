'use strict';

var Browser = require('../views/browser');
var Core = require('@netgen/layouts-core-ui');
var $ = Core.$;
var _ = Core._;

function MultipleBrowse(el, opts) {
  opts || (opts = {});
  this.$el = $(el);
  var data = this.$el.data();
  this.input_template = data.browserPrototype;
  this.$items = this.$el.find('.items');
  this.$config_input = this.$el.find('.js-config-name');
  var config_name = this.$config_input.val();
  var overrides = $.extend({}, data, opts.overrides);
  this.$name = this.$el.find('.js-name');
  this.$input = this.$el.find('input');
  this.$trigger = this.$el.find('.js-trigger');


  this.browser_opts = $.extend({
    tree_config: {
      root_path: config_name,
      overrides: overrides
    },
  }, opts);

  this.setup_events();
}


MultipleBrowse.prototype.preselected_item_values = function() {
  return this.$items.find('input').map(function(){
    return $(this).val();
  }).get();
};


MultipleBrowse.prototype.setup_events = function() {
  this.$el.on('click', '.js-trigger', this.$change.bind(this));
  this.$el.on('click', '.js-remove', this.$remove.bind(this));
};


MultipleBrowse.prototype.$change = function(e){
  e.preventDefault();
  var self = this;
  this.browser_opts.disabled_item_values = this.preselected_item_values();
  this.browser = new Browser(this.browser_opts).on('apply', function(){
    self.$items.append(self.render(this.selected_collection));
    self.trigger_change();
    self.$empty_items();
  }).load_and_open();
};


MultipleBrowse.prototype.trigger_change = function(){
  this.$el.trigger('browser:change', {instance: this, browser: this.browser});
};

MultipleBrowse.prototype.$remove = function(e){
  e.preventDefault();
  $(e.target).closest('.item').remove();
  this.$empty_items();
  this.trigger_change();
};

MultipleBrowse.prototype.$empty_items = function(){
  !this.$items.find('.item').length ? this.$el.addClass('items-empty') : this.$el.removeClass('items-empty');
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

$(function(){
  $('.js-multiple-browse').multiple_browse();
});
