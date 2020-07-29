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
        me.res.textln("設定版面成功");
        me.res.send();
      });
    }
    this.res.addBtnRow();

    this.addBtn("↓", [], () => Start);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.forumCardControl], () => Forum);
  }
}

export default Scene;
