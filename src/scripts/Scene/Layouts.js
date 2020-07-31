const Layouts = {
  STBY: {
    id: "STBY",
    title: "StandBy",
    modes: ["STBY"],
  },
  Session: {
    id: "Session",
    title: "Session",
    modes: ["PPT+IRC", "SLIDO+IRC", "PPT+SLIDO"],
  },
  Event: {
    id: "Event",
    title: "Session",
    modes: ["PPT+IRC"],
  },
  Forum: {
    id: "Forum",
    title: "Forum",
    modes: ["PPT", "SLIDO"],
  },
  LightningTalk: {
    id: "LightningTalk",
    title: "LightingTalk",
    modes: ["STBY", "PPT", "TIMEUP"],
  },

  fromSession(session) {
    console.log(session);

    if (session.type == "F") return this.Forum;
    if (session.type == "L") return this.LightningTalk;
    if (session.type == "Ev") return this.Event;

    return this.Session;
  },
};

export default Layouts;
