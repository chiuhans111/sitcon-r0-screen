import slidoCode from "./slidoCode.json";

function process(data) {
  let rooms = {};
  window.slidoCode = {};

  data.sessions.map((session) => {
    let title = session.zh.title;
    let start = new Date(session.start);
    let end = new Date(session.end);
    let qa = session.qa;
    let type = session.type;
    let room = session.room;
    let id = session.id;

    let speakers = session.speakers.map((speakerId) => {
      let speaker = data.speakers.find((x) => x.id == speakerId);
      let name = speaker.zh.name;
      let avatar = speaker.avatar;
      return { name, avatar };
    });

    if (rooms[room] == null) rooms[room] = [];

    let parsed = {
      title,
      start,
      end,
      qa,
      type,
      room,
      speakers,
      id,
    };

    // slido code
    let me = parsed;
    let you = session;
    me.hash = "";
    me.code = session.code || "";

    if (qa) {
      let hash = qa.split("/").pop();
      me.hash = hash;
      let xhr = new XMLHttpRequest();

      if (slidoCode[hash]) {
        window.slidoCode[hash] = you.code = me.code = slidoCode[hash];
      } else {
        xhr.open("get", "https://wall.sli.do/api/v0.5/events?hash=" + hash);
        xhr.onload = function() {
          window.slidoCode[hash] = you.code = me.code = JSON.parse(
            xhr.response
          )[0].code;
        };
        xhr.send();
      }
    }

    rooms[room].push(parsed);
  });

  for (let i in rooms) {
    let room = rooms[i];
    room.sort((a, b) => {
      return a.start.getTime() - b.start.getTime();
    });
  }

  for (let i in rooms) {
    let room = rooms[i];
    room
      .filter((session) => {
        session.isBreak = false;
        if (
          session.type == "Ev" &&
          session.title != "開幕" &&
          session.title != "閉幕"
        ) {
          session.isBreak = true;
          return false;
        }
        return true;
      })
      .map((session, i, arr) => {
        if (i > 0) session.prevTalk = arr[i - 1];
        if (i + 1 < arr.length) session.nextTalk = arr[i + 1];
      });
  }

  for (let i in rooms) {
    let room = rooms[i];
    room.map((session, i, arr) => {
      if (i > 0) session.prev = arr[i - 1];
      if (i + 1 < arr.length) session.next = arr[i + 1];
    });
  }

  console.log(data);

  return rooms;
}

export default {
  process,
};
