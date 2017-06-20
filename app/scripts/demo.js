'use strict';

var Browser = require('./main');
var Core = require('netgen-core');

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
      // start_location: 999,
      start_location: 246,
      custom_params: {
        hello: 'world'
      },
      root_path: type // ezcontent, ezlocation, eztags
    }
  }).on('apply', function(){
    alert(browser.selected_values());
  }).load_and_open();
});


$('.js-input-browse').input_browse();
