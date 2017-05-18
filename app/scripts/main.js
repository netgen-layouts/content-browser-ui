'use strict';
require('./templates_loader');
var Browser = require('./views/browser');
var Core = require('netgen-core');
var $ = Core.$;
require('./jquery/multiple');

function InputBrowse(el, opts) {
  opts || (opts = {});
  this.$el = $(el);
  this.$name = this.$el.find('.js-name');
  this.$input = this.$el.find('.js-value');
  this.$trigger = this.$el.find('.js-trigger');
  this.empty_note = this.$name.data('empty-note');
  this.$config_input = this.$el.find('.js-config-name');
  var data = this.$el.data();
  var config_name = this.$config_input.val();
  var overrides = $.extend({}, data, opts.overrides, {min_selected: 1, max_selected: 1});

  this.browser_opts = $.extend({
    tree_config: {
      root_path: config_name,
      overrides: overrides
    },
  }, opts);

  this.setup_events();
}

InputBrowse.prototype.setup_events = function() {
  this.$el.on('click', '.js-trigger', this.$change.bind(this));
  this.$el.on('click', '.js-clear', this.$clear.bind(this));
  this.$el.on('change', '.js-config-name', this.$change_config_name.bind(this));
};


InputBrowse.prototype.$change = function(e){
  e && e.preventDefault();
  var self = this;
  this.browser = new Browser(this.browser_opts).on('apply', function(){
    var selected = this.selected_collection.first();
    if(selected){
      self.$input.val(selected.get('value'));
      self.$name.html(selected.get('name'));
      self.$el.trigger('browser:change', {instance: self, browser: self.browser, selected: selected});
      self.$el.removeClass('item-empty');
    }
  }).on('cancel', function(){
    self.$el.trigger('browser:cancel');
  }).load_and_open();
};


InputBrowse.prototype.$change_config_name = function(){
  this.browser_opts.tree_config.root_path = this.$config_input.val();
  this.$clear();
}


InputBrowse.prototype.$clear = function() {
  this.$input.val('');
  this.$name.html(this.empty_note);
  this.$el.trigger('browser:change', {instance: this, browser: this.browser, selected: null});
  this.$el.addClass('item-empty');
};


$.fn.input_browse = function (opts) {
  return $(this).each(function(){
    console.log('input_browse');
    var $this = $(this);
    if($this.data('input_browse')){ return; }
    var instance = new InputBrowse(this, opts);
    $this.data('input_browse', instance);
  });
};


module.exports = Browser;
