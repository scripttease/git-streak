var fetch = require("node-fetch");
var handleData = require("./data-handling");
var express = require("express");
var app = express();

app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(express.static("layouts"));

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
    }).then(function(data) {
      // this variable calls handle data now
      var streakInfo = handleData(data);
      // res.send(streakInfo.svg); // renders correctly but in curly braces so as text/string not as actual svg.
      // res.json(streakInfo);
      res.render("streaks", streakInfo);
  });
});
module.exports = app;
