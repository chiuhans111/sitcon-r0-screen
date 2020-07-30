const Layouts = {
  STBY: {
    title: "StandBy",
    modes: ["STBY"],
  },
  Session: {
    title: "Session",
    modes: ["PPT+IRC", "SLIDO+IRC", "PPT+SLIDO"],
  },
  Forum: {
    title: "Forum",
    modes: ["PPT", "SLIDO"],
  },
  LightningTalk: {
    title: "LightingTalk",
    modes: ["STBY", "PPT", "TIMEUP"],
  },

  fromSession(session) {
    console.log(session);
    if (session.type == "Ev") return this.STBY;
    if (session.type == "F") return this.Forum;
    if (session.type == "L") return this.LightningTalk;

    return this.Session;
  },
};

export default Layouts;
