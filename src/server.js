var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("views"));
// app.use(express.bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());


app.get("/", function(req, res) {
  res.render("index.html");
});

app.post("/", function(req, res) {
  res.send("meep");
  // res.render("streaks.html", {
  //   name: req.body.name
  // });
});
module.exports = app;
