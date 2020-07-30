import session from "./session.json";
import utils from "./utils";
import time from "../Time/time";

function normalizeTime(time) {
  let start = new Date(time);
  start.setHours(0, 0, 0, 0);
  return time - start.getTime();
}

let data = {
  // session: {},
  rooms: {},
  fromTime(time, roomId = "R0") {
    time = normalizeTime(time);

    let room = this.rooms[roomId];
    let remain = room.filter((session) => {
      // if (session.start.getTime() > time) return false;
      session.isBreak = false;
      if (session.type == "Ev" && session.title.match("休息")) {
        session.isBreak = true;
        return false;
      }
      if (session.nextTalk) {
        if (time > normalizeTime(session.nextTalk.start.getTime()))
          return false;
      } else if (session.next) {
        if (time > normalizeTime(session.next.start.getTime())) return false;
      }

      return true;
    });

    if (remain.length > 0) return remain[0];
    return null;
  },
  fromNow() {
    return this.fromTime(time());
  },
};

function loadSession(session) {
  // console.log(session);
  // data.session = session;
  data.rooms = utils.process(session);
}

loadSession(session);

let xhr = new XMLHttpRequest();
xhr.open("get", "https://sitcon.org/2020/json/session.json");
xhr.onload = function() {
  loadSession(JSON.parse(xhr.response));
};
xhr.send();

export default data;
