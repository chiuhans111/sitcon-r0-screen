import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";

import Scene from "./Scene";
import Session from "./Session";
import Seminar from "./Seminar";

class Start extends Page {
  name = "SITCON 2020 控制台";

  permissions = [permissions.visit];

  checkPermission() {
    return guardian.check(this.user, this.permissions);
  }

  initialize() {
    this.res.textln("welcome " + this.user + " !");
    this.res.textln("你能使用的權限：");
    this.res.textln(
      guardian
        .see(this.user)
        .map((x) => x.title)
        .join("、")
    );

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.seminarCardControl], () => Seminar);
  }
}

export default Start;
0;
