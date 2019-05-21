const express = require('express');
const model = require('./helpers');

const app = express();

app.get('/cb/api/v1/:name/config', function (req, res) {
  const data = model.getConfig(req);
  res.send(data);
});

app.get('/cb/api/v1/:name/browse/:id/items', function (req, res) {
  const data = model.getChildrenItems(req);
  res.send(data);
});

app.get('/cb/api/v1/:name/browse/:id/locations', function (req, res) {
  const data = model.getLocationItems(req);
  res.send(data);
});

app.get('/cb/api/v1/:name/render/:id', function (req, res) {
  const data = model.getPreview(req);
  res.send(data);
});

app.get('/cb/api/v1/:name/search', function (req, res) {
  const data = model.getSearchResults(req);
  res.send(data);
});

app.listen('8282');
