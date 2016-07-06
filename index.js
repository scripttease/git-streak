var http = require("http");
var fetch = require("node-fetch");
var handleData = require("./src/data-handling")

function getContributions() {
  var username = "scripttease";
  fetch("https://github.com/users/" + username + "/contributions")
    .then(function(response) {
      return response.text();
    }).then(handleData);
}

getContributions();

