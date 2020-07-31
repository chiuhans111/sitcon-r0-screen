import TelegramBot from "./TelegramBot";
import Start from "./Pages/Start";
import VisotorPage from "./Pages/VisitorPage";

import Layouts from "../Scene/Layouts";
import SessionData from "../Session";

import guardian from "./authenticate/guardian";
import permissions from "./authenticate/permissions";
import Speakers from "../Scene/Speakers";

class ControlBot extends TelegramBot {
  constructor(token) {
    super(token);

    this.userstates = {};

    this.globalstate = {
      layout: Layouts.STBY,
      mode: Layouts.STBY.modes[0],
      auto: true,
      session: null,
      speaker: null,
    };

    if (localStorage.ControlBot_globalstate) {
      this.globalstate = JSON.parse(localStorage.ControlBot_globalstate);
      if (this.globalstate.session)
        this.globalstate.session = SessionData.byId[this.globalstate.session];
      if (this.globalstate.speaker)
        this.globalstate.speaker = Speakers[this.globalstate.speaker];
      if (this.globalstate.layout)
        this.globalstate.layout = Layouts[this.globalstate.layout];
    }

    this.defaultPage = Start;
    this.defaultVisotorPage = VisotorPage;
  }

  saveState() {
    let savedState = {};
    Object.assign(savedState, this.globalstate);
    if (this.globalstate.session)
      savedState.session = this.globalstate.session.id;
    if (this.globalstate.speaker)
      savedState.speaker = this.globalstate.speaker.id;
    if (this.globalstate.layout) savedState.layout = this.globalstate.layout.id;
    localStorage.ControlBot_globalstate = JSON.stringify(savedState);
  }

  broadcastUpdate(msg, permissions) {
    for (let i in this.userstates) {
      if (guardian.check(this.userstates[i].user, permissions)) {
        this.userstates[i].reload(msg);
      }
    }
    this.saveState();
  }

  setLayout(layout) {
    if (layout == this.globalstate.layout) return;
    this.globalstate.layout = layout;
    if (!this.globalstate.layout.modes.includes(this.globalstate.mode))
      this.setMode(this.globalstate.layout.modes[0]);

    this.broadcastUpdate("更新版面為：" + layout.title, [
      permissions.participate,
    ]);
    this.saveState();
  }

  setMode(mode) {
    if (mode == this.globalstate.mode) return;
    if (this.globalstate.layout.modes.includes(mode)) {
      this.globalstate.mode = mode;

      this.broadcastUpdate("更新模式為：" + mode, [permissions.participate]);
    }
    this.saveState();
  }

  setAuto(auto) {
    if (auto == this.globalstate.auto) return;
    this.globalstate.auto = auto;

    this.broadcastUpdate("更新議程自動規則：" + auto, [
      permissions.participate,
    ]);
    this.saveState();
  }

  setSession(session) {
    if (session == this.globalstate.session) return;
    this.globalstate.session = session;
    this.setLayout(Layouts.fromSession(session));
    if (session.type == "F") this.setSpeaker(null);

    this.broadcastUpdate("更新議程為：" + session.title, [
      permissions.participate,
    ]);
    this.saveState();
  }

  setSpeaker(speaker) {
    if (speaker == this.globalstate.speaker) return;
    let name = "無";
    if (speaker) name = speaker.name;
    this.globalstate.speaker = speaker;
    this.broadcastUpdate("更新講者為：" + name, [permissions.participate]);
    this.saveState();
  }

  update() {
    if (this.globalstate.auto) {
      let session = SessionData.fromNow();
      if (session) {
        this.setSession(session);
        // console.log(session);
      }
    }
  }

  receiveMessage(msg, res) {
    console.log(msg, res);
    this.receiveInput(
      msg.chat.username,
      {
        text: msg.text,
        message: true,
      },
      res
    );
  }

  receiveCallback(cal, res) {
    this.receiveInput(
      cal.from.username,
      {
        text: cal.data,
        callback: true,
      },
      res
    );
  }

  receiveInput(user, data, res) {
    if (user == undefined) {
      res.textln("歡迎來到 SITCON 控台");
      res.textln("你必須有 telegram username 才能使用此服務。");
      res.send();
      return;
    }

    if (this.userstates[user] == null) {
      this.userstates[user] = new this.defaultPage(this, user, data, res);
      if (!guardian.check(user, [permissions.participate])) {
        this.userstates[user] = new this.defaultVisotorPage(
          this,
          user,
          data,
          res
        );
      }
    }

    let nextPage = this.userstates[user].handle(data, res);

    if (nextPage === "quit") {
      delete this.userstates[user];
      return;
    }

    if (nextPage) {
      setTimeout(() => {
        let page = new nextPage(this, user, data, res);
        console.log(page);
        if (page.checkPermission()) {
          delete this.userstates[user];
          this.userstates[user] = page;
        } else {
          res.textln("你沒有權限執行此項目");
          this.userstates[user] = new this.defaultPage(this, user, data, res);
        }
      }, 0);
    }

    if (nextPage === false) {
      // res.textln("錯誤的操作。");
      // res.send(true);
    }
    // res.send();
  }
}

export default ControlBot;
