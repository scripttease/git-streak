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
  // Array of objects where streak is the number of days in a row that have had non-zero commits and date is the date of the LAST date in the streak (of non-zero commits)
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
  // console.log(days);
  // console.log(allStreaksArray);
  // ASK LOUIS how do I put these into an API for people?
  //
  // Prints an object that contains the *most recent* longest streak.
  var longestStreakObj;
  var longestStreakAcc = 0;
  var longestStreak = allStreaksArray.forEach(function(obj) {
    if (obj.streak >= longestStreakAcc) {
      longestStreakObj = {
        streakLength: obj.streak,
        startDate: new Date((Date.parse(new Date(obj.date))) - ((obj.streak -1)*1000*60*60*24)),
        endDate: new Date(obj.date),
      };
      longestStreakAcc = obj.streak;
    };
  });
  console.log(longestStreakObj);
  // app.locals.lso = longestStreakObj;
  document.getElementById("testP").innerHTML = longestStreakObj;
  console.log("Your longest streak was " + longestStreakObj.streakLength + " days! You were ON FIRE!");
  // Current streak
  var todayObj = days[days.length-1];
  var today = new Date(todayObj.date);
  if (today = new Date(allStreaksArray[allStreaksArray.length-1].date)) {
    console.log("Your current streak is " + allStreaksArray[allStreaksArray.length-1].streak + " days. Groovy! Don't stop me now.. I'm having such a good time...");
  } else {
    console.log("You don't have any commits today, so your current streak is zero! Quick, hit up that Ship-It Squirrel!");
  };
}
// export function
module.exports = handleData;
