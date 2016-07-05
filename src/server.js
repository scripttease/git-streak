var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("any string");
});

module.exports = app;
