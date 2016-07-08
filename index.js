var http = require("http");
var fetch = require("node-fetch");
var handleData = require("./src/data-handling");

function getContributions() {
  var username = "scripttease";
  fetch("https://github.com/users/" + username + "/contributions")
    .then(function(response) {
      return response.text();
    }).then(handleData);
}

getContributions();
 
function formfunction(form) {
  var usernameA = form.inputBox.value;
  console.log(usernameA);
// window.location = "localhost:1234/" + usernameA;
}
