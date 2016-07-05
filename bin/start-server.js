var app = require("../src/server");

app.listen(1234, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Listening on port 1234");
  }
});
