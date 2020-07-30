import permissions from "../authenticate/permissions";
import Page from "./Page";

import Start from "./Start";
import SessionData from "../../Session";

import FormatTime from "../../Format/time";
import Scene from "./Scene";
import Forum from "./Forum";

class SessionSelector extends Page {
  initialize() {
    this.name = "議程選擇";
    this.permissions = [permissions.sessionControl];

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.ForumControl], () => Forum);

    let me = this;

    let currentSession = SessionData.fromNow();

    SessionData.rooms["R0"]
      .filter((session) => !session.isBreak)
      .map((session, i) => {
        let name = session.title;
        let btnText = FormatTime.hhmm(session.start) + " " + name.substr(0, 7);

        if (this.bot.globalstate.session == session)
          btnText = "[" + btnText + "]";

        if (currentSession == session) btnText = "> " + btnText;
        me.addInlineBtn(btnText, this.permissions, () => {
          me.res.textln("議程設定為：");
          me.res.textln(
            FormatTime.hhmm(session.start) +
              " - " +
              FormatTime.hhmm(session.end)
          );
          me.res.textln(session.title);
          me.res.send();
          me.bot.setSession(session);
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

    this.addBtn("手動", this.permissions, function() {
      me.bot.setAuto(false);
      return SessionSelector;
    });

    this.addBtn("自動", this.permissions, function() {
      me.bot.setAuto(true);
    });

    this.res.addBtnRow();

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("[議程]", [], () => Start);
    this.addBtn("論壇", [permissions.ForumControl], () => Forum);
  }
}

export default Session;
