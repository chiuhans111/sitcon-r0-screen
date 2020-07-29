function padleft(str, len, symbol = "0") {
  str = str.toString();
  while (str.length < len) {
    str = symbol + str;
  }
  return str;
}

function hhmm(time) {
  let date = new Date(time);
  let hour = date.getHours();
  let minute = date.getMinutes();
  return `${padleft(hour, 2)}:${padleft(minute, 2)}`;
}

export default {
  hhmm,
};
