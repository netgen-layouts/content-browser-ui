'use strict';

function normalize_path(path) {
  return path.replace(/\/+/g, '/');
}

var self = module.exports = {
  cb_base_path: '/cb',
  cb_base_api_path: '/api/v1/',

  cb_api_url: function(path) {
    return normalize_path(self.cb_base_path + self.cb_base_api_path + path);
  }
};
