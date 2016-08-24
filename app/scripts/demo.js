'use strict';

var Browser = require('./main');
var Core = require('core');

// var browser = new Browser({
//   tree_config: {
//     root_path: 'ezcontent' // ezcontent, ezlocation, eztags
//   }
// }).on('apply', function(){
//   alert(browser.selected_values());
// });

var $ = Core.$;

$(document).on('click', '.js-open-browser', function(e){
  e.preventDefault();
  var type = $('select').val();
  console.log(type);
  var browser = new Browser({
    tree_config: {
      root_path: type // ezcontent, ezlocation, eztags
    }
  }).on('apply', function(){
    alert(browser.selected_values());
  }).load_and_open();
})


