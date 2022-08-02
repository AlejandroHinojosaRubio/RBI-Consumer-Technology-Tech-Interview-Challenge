const express = require('express');

const menu = require('./data/menu.json');
const sections = require('./data/sections.json');
const items = require('./data/items.json');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/menu', (req, res, next) => {
  setTimeout(() => {
    res.json(menu);
  }, 300);
});

app.get('/api/sections', (req, res, next) => {
  setTimeout(() => {
    res.json(sections);
  }, 300);
});

app.get('/api/items', (req, res, next) => {
  setTimeout(() => {
    res.json(items);
    
  }, 800);
});

app.listen(3001, () => {
  console.log('API server running on localhost:3001');
});
