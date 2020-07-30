function process(data) {
  let rooms = {};

  data.sessions.map((session) => {
    let title = session.zh.title;
    let start = new Date(session.start);
    let end = new Date(session.end);
    let qa = session.qa;
    let type = session.type;
    let room = session.room;

    let speakers = session.speakers.map((speakerId) => {
      let speaker = data.speakers.find((x) => x.id == speakerId);
      let name = speaker.zh.name;
      let avatar = speaker.avatar;
      return { name, avatar };
    });

    if (rooms[room] == null) rooms[room] = [];

    session.parsed = {
      title,
      start,
      end,
      qa,
      type,
      room,
      speakers,
    };

    rooms[room].push(session.parsed);
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
        if (session.type == "Ev") return false;
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

      // slido code
      let me = session;
      let qa = session.qa;
      session.hash = "";
      session.code = "";

      if (qa) {
        let hash = qa.split("/").pop();
        me.hash = hash;
        let xhr = new XMLHttpRequest();
        xhr.open("get", "https://wall.sli.do/api/v0.5/events?hash=" + hash);
        xhr.onload = function() {
          me.code = JSON.parse(xhr.response)[0].code;
        };
        xhr.send();
      }
    });
  }

  return rooms;
}

export default {
  process,
};
