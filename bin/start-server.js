var app = require("../src/server");
var port = process.env.PORT || 1234;

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Listening on port " + port);
  }
});
