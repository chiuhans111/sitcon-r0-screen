// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
// import Layouts from "../../Scene/Layouts";

import Start from "./Start";
import Session from "./Session";
import Forum from "./Forum";
class Scene extends Page {
  initialize() {
    let me = this;
    this.name = "場景選擇";
    this.permissions = [permissions.layoutControl];

    for (let mode of this.bot.globalstate.layout.modes) {
      let btnText = mode;
      if (this.bot.globalstate.mode == mode) btnText = "[" + btnText + "]";

      this.addBtn(btnText, this.permissions, function() {
        me.bot.setMode(mode);
      });
    }
    this.res.addBtnRow();

    this.addBtn("[導播]", [], () => Start);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.forumCardControl], () => Forum);
  }
}

export default Scene;
