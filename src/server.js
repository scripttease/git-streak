var express = require("express");
var app = express();
// var bodyParser = require("body-parser");

app.use(express.static("views"));
app.set('view engine', 'ejs');

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

// app.post("/", function(req, res) {
//   res.send("meep");
  // res.render("streaks", {
  //   name: req.body.name
  // });
// });
module.exports = app;
