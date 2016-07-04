var http = require("http");
var fetch = require('node-fetch');

function getContributions() {
  var username = "scripttease";
  fetch("https://github.com/users/" + username + "/contributions")
    .then(function(response) {
      return response.text();
    }).then(handleData);
}

getContributions();

function handleData(data) {
  var stringData = data.toString();
  var lines = stringData.split("\n");
  var pattern = /data-count="(\d+)".+data-date="(\d\d\d\d-\d\d-\d\d)"/;
  var days = lines.map(function(string) {
    return pattern.exec(string);
  }).filter(function(x) {
    return x !== null;
  }).map(function(array) {
    return {
      commits: parseInt(array[1]),
      date: array[2],
    };
  });

  console.log(days);
}
