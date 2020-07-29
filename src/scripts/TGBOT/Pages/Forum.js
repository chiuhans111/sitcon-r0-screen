// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
import Layouts from "../../Scene/Layouts";
import Speakers from "../../Scene/Speakers";

import Start from "./Start";
import Session from "./Session";
import Scene from "./Scene";

class Forum extends Page {
  initialize() {
    this.name = "論壇字卡";
    this.permissions = [permissions.forumCardControl];

    let me = this;

    if (me.bot.globalstate.layout == Layouts.Forum) {
      me.bot.globalstate.layout.modes.map((mode) => {
        this.addBtn(mode, [permissions.forumModeControl], function() {
          if (me.bot.globalstate.layout == Layouts.Forum) {
            me.bot.setMode(mode)
          }
        });
      });
      this.res.addBtnRow();

      for (let i in Speakers) {
        this.addBtn(
          Speakers[i].name,
          [permissions.forumCardControl],
          function() {
            me.bot.setSpeaker(Speakers[i]);
          }
        );
      }

      this.res.addBtnRow();
      this.addBtn("無字卡", [permissions.forumCardControl], function() {
        me.bot.setSpeaker(null);
      });
    } else {
      this.addBtn(
        "目前不是論壇版型",
        [permissions.forumCardControl],
        function() {}
      );
    }

    this.res.addBtnRow();

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("↓", [], () => Start);
  }
}

export default Forum;
