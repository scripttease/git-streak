var fetch = require("node-fetch");
var handleData = require("./data-handling");
var express = require("express");
var app = express();
// var bodyParser = require("body-parser");

app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(express.static("layouts"));

// app.use(express.bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

// app.locals({
//   me: "Alice",
// });
app.locals.me = "meeeee"

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
      res.json(streakInfo);
    });
});
// app.post("/", function(req, res) {
//   res.send("meep");
  // res.render("streaks", {
  //   name: req.body.name
  // });
// });
module.exports = app;
