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

function getUserInfo(username) {
  return fetch("https://github.com/users/" + username + "/contributions")
    // fetch will only throw error if there is network problem
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Username not found");
        // Error is a pre-defined class constructor. like Date this has created an error object
      }
      return response;
    })
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      var streakInfo = handleData(data);
      return streakInfo;
    });
}
//move this function to a new module like github module

app.get("/streak/:username", function(req, res) {
  var username = req.params.username;
  getUserInfo(username)
    .then(function(streakInfo) {
      res.render("streaks", streakInfo);
    })
    .catch(function(error) {
      res.status(404).send("Username not found");
    });
      // note a render function cannot take a function or callback, only (as second arg) an object
});
module.exports = app;
