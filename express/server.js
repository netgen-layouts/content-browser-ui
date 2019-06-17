const path = require('path');
const express = require('express');
const model = require('./helpers');

const app = express();

app.get('/cb/api/:name/config', function (req, res) {
  const data = model.getConfig(req);
  res.send(data);
});

app.get('/cb/api/:name/browse/:id/items', function (req, res) {
  const data = model.getChildrenItems(req);
  res.send(data);
});

app.get('/cb/api/:name/browse/:id/locations', function (req, res) {
  const data = model.getLocationItems(req);
  res.send(data);
});

app.get('/cb/api/:name/render/:id', function (req, res) {
  const data = model.getPreview(req);
  res.send(data);
});

app.get('/cb/api/:name/search', function (req, res) {
  const data = model.getSearchResults(req);
  res.send(data);
});

app.use(express.static(path.join(__dirname, '../bundle/Resources/public'), {
    index: false
}));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen('8282');
