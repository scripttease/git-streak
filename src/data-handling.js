function extractStreakData(data) {
  var rawSVG = data;
  var stringData = data.toString();
  var svgObj;
  var svgObj = {
    svg: stringData,
    svgRaw: rawSVG,
  }
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

  var currentStreakObj;
  var todayObj = days[days.length-1];
  var today = new Date(todayObj.date);
  if (todayObj.date === allStreaksArray[allStreaksArray.length-1].date) {
    currentStreakObj = {
      streakLength: allStreaksArray[allStreaksArray.length-1].streak,
      startDate: new Date((Date.parse(new Date(today))) - ((allStreaksArray[allStreaksArray.length-1].streak -1)*1000*60*60*24)),
      endDate: new Date(today),
    };
  } else {
  };
  return {
    longestStreak: longestStreakObj,
    currentStreak: currentStreakObj,
    svg: svgObj,
  }
}
// export function
module.exports = extractStreakData;
