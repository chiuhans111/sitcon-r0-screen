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

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.ForumControl], () => Forum);

    let me = this;
    SessionData.session.sessions
      .filter((session) => {
        return session.room === "R0";
      })
      .map((session, i) => {
        let name = session.zh.title;

        me.addInlineBtn(
          FormatTime.hhmm(session.start) + " " + name.substr(0, 10),
          this.permissions,
          () => {
            me.res.textln("議程設定為：");
            me.res.textln(
              FormatTime.hhmm(session.start) +
                " - " +
                FormatTime.hhmm(session.end)
            );
            me.res.textln(session.zh.title);
            me.bot.setSession(session);
          }
        );

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
      me.res.textln("已設定議程為手動。");
      // me.res.send()
      me.bot.setAuto(false)
      return SessionSelector;
    });
    
    this.addBtn("自動", this.permissions, function() {
      me.res.textln("已設定議程為自動。");
      me.bot.setAuto(true)
    });

    this.res.addBtnRow();

    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("↓", [], () => Start);
    this.addBtn("論壇", [permissions.ForumControl], () => Forum);
  }
}

export default Session;
