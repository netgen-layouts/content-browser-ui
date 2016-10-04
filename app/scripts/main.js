'use strict';
require('./templates_loader');
var Browser = require('./views/browser');
var _ = require('underscore');

require('./jquery/multiple');

function InputBrowse(el, opts) {
  opts || (opts = {});
  this.$el = $(el);
  this.$name = this.$el.find('.js-name');
  this.$input = this.$el.find('input');
  this.$trigger = this.$el.find('.js-trigger');
  var data = this.$el.data();
  var overrides = $.extend({}, data, opts.overrides);


  this.browser_opts = $.extend({
    tree_config: {
      root_path: data.browserConfigName,
      overrides: overrides
    },
  }, opts);

  this.setup_events();
}

InputBrowse.prototype.setup_events = function() {
  this.$el.on('click', '.js-trigger', this.$change.bind(this));
};


InputBrowse.prototype.$change = function(e){
  e.preventDefault();
  var self = this;
  this.browser = new Browser(this.browser_opts).on('apply', function(){
    var selected = this.selected_collection.first();
    if(selected){
      self.$input.val(selected.get('value'));
      self.$name.html(selected.get('name'));
      self.$el.trigger('browser:change', {instance: this, browser: self.browser, selected: selected});
    }
  }).load_and_open();
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
