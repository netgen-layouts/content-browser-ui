'use strict';

require('./templates_loader');
var Browser = require('./views/browser');

function InputBrowse(el) {
  this.$el = $(el);
  this.$name = this.$el.find('.js-name');
  this.$input = this.$el.find('input');
  this.$trigger = this.$el.find('.js-trigger');
  var data = this.$el.data();

  this.browser_opts = {
    tree_config: {
      root_path: data.browserConfigName
    }
  };

  this.setup_events();
}

InputBrowse.prototype.setup_events = function() {
  this.$el.on('click', this.$change.bind(this));
};


InputBrowse.prototype.$change = function(){
  var self = this;
  this.browser = new Browser(this.browser_opts).on('apply', function(){
    var selected = this.selected_collection.first();
    self.$input.val(selected.get('value'));
    self.$name.html(selected.get('name'));
    self.$el.trigger('browser:change', {instance: this, browser: this.browser});
  }).load_and_open();
};



$.fn.input_browse = function () {
  return $.each(function(){
    var $this = $(this);
    if($this.data('input_browse')){ return; }
    var instance = new $.InputBrowse(this);
    $this.data('input_browse', instance);
  });
};


module.exports = Browser;
