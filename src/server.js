var fetch = require("node-fetch");
var handleData = require("./data-handling");
var express = require("express");
var app = express();

app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(express.static("layouts"));

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/streak/:username", function(req, res) {
  var username = req.params.username;
  fetch("https://github.com/users/" + username + "/contributions")
    .then(function(response) {
      return response.text();
    }).then(function(data) {
      var streakInfo = handleData(data);
      res.render("streaks", streakInfo);
  });
});
module.exports = app;
