var fetch = require("node-fetch");
var handleData = require("./data-handling");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(helmet());

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
