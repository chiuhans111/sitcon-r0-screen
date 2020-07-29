// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
// import Layouts from "../../Scene/Layouts";

import Start from "./Start";
import Session from "./Session";
import Seminar from "./Seminar";
class Scene extends Page {
  initialize() {
    let me = this;
    this.name = "場景選擇";
    this.permissions = [permissions.layoutControl];

    this.addBtn("←BACK", [], () => Start);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.seminarCardControl], () => Seminar);

    this.res.addBtnRow();

    for (let mode of this.bot.globalstate.layout.modes) {
      this.addBtn(mode, this.permissions, function() {
        me.bot.globalstate.mode = mode;
      });
    }
  }
}

export default Scene;
