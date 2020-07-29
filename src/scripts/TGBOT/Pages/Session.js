import permissions from "../authenticate/permissions";
import Page from "./Page";

import Start from "./Start";
import SessionData from "../../Session";

class SessionSelector extends Page {
  initialize() {
    this.name = "議程選擇";

    this.addBtn("←回去", [], () => Session);

    let me = this;
    SessionData.session.sessions
      .filter((session) => {
        return session.room === "R0";
      })
      .map((session, i) => {
        let name = session.zh.title;

        me.addInlineBtn(name, [], () => {
          me.bot.globalstate.session = session;
        });

        if (i % 2 == 1) {
          me.res.addInlineBtnRow();
        }
      });
  }
}

class Session extends Page {
  initialize() {
    let me = this;
    this.name = "議程管理";
    this.permissions = [permissions.sessionControl];

    this.addBtn("←回去", [], () => Start);

    this.res.addBtnRow();

    this.addBtn("/manual", this.permissions, function() {
      me.bot.globalstate.auto = false;
      return SessionSelector;
    });

    this.addBtn("/auto", this.permissions, function() {
      me.bot.globalstate.auto = true;
    });
  }
}

export default Session;
