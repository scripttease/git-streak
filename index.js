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

  var allStreaksArray = [];
  var streakObj;
  var streakLength = 0;
  var streaks = days.forEach(function(obj) {
    if (obj.commits !== 0) {
      streakObj =  {
        streak: streakLength += 1,
        date: obj.date,
      };
      allStreaksArray.push(streakObj);
      var longestStreakAcc = 0;
    } else {
      streakLength = 0;
    };
  });

  console.log(days);
  console.log(allStreaksArray);

  var longestStreakObj;
  var longestStreakAcc = 0;
  var longestStreak = allStreaksArray.forEach(function(obj) {
    if (obj.streak > longestStreakAcc) {
      longestStreakObj = {
        streakLength: obj.streak,
        startDate: new Date((Date.parse(new Date(obj.date))) - ((obj.streak -1)*1000*60*60*24)),
        endDate: new Date(obj.date),
      };
      longestStreakAcc = obj.streak;
    };
  });
  console.log(longestStreakObj);
}





      // var longestStreakObj;
      // var longestStreak = allStreaksArray.forEach(function(obj) {
      //   if (obj.streak >= streakLength) 
      //     longestStreakObj = {
      //       streak: streakLength +1,
      //       date: obj.date,
      //     };
    
  // });
