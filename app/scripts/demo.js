'use strict';

var Browser = require('./main');

// var browser = new Browser({
//   tree_config: {
//     root_path: 'ezcontent' // ezcontent, ezlocation, eztags
//   }
// }).on('apply', function(){
//   alert(browser.selected_values());
// });

// $(document).on('ready', '.js-open-browser', function(e){
  // e.preventDefault();
  var browser = new Browser({
    tree_config: {
      root_path: 'ezcontent' // ezcontent, ezlocation, eztags
    }
  }).on('apply', function(){
    alert(browser.selected_values());
  }).load_and_open();
// })


