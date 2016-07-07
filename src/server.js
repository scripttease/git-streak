var fetch = require("node-fetch");
var handleData = require("./data-handling");
var express = require("express");
var app = express();
// These requirements must be available on every page that uses them - unlike ruby
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
// the : in the username tells the route that it could be any value
app.get("/streak/:username", function(req, res) {
  //now there are params available (username in this case) from the route - our :could-be-anything would mean that the request parameter was could-be-anything from our get request.
  var username = req.params.username;
  fetch("https://github.com/users/" + username + "/contributions")
  // this uses the handledata fn but with an extra promise so that results are available to the route
    .then(function(response) {
      return response.text();
      //extra promise here
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
