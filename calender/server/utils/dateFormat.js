const addDateSuffix = (date) => {
  let dateStr = date.toString();

  // get last char of date string
  let lastChar = dateStr.charAt(dateStr.length - 1);
if (lastChar < 10) {
lastChar = `${lastChar}`
}
  return lastChar;
};

// function to format a timestamp, accepts the timestamp and an `options` object as parameters
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  // create month object
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December',
  };

  const dateObj = new Date(timestamp);
  let formattedMonth = 1 + dateObj.getUTCMonth();
  if (formattedMonth < 10) {
    formattedMonth = `0${formattedMonth}`;
  }

  let dayOfMonth = dateObj.getUTCDate()
  if (dayOfMonth < 10) {
    dayOfMonth = `0${dayOfMonth}`;
  }

  const year = dateObj.getUTCFullYear();


  const formattedTimeStamp = `${year}-${formattedMonth}-${dayOfMonth}   `;

  return formattedTimeStamp;
  
};
