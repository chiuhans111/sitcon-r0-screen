import TelegramBot from "./TelegramBot";
import Start from "./Pages/Start";

import Layouts from "../Scene/Layouts";
import SessionData from "../Session";

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

    this.defaultPage = Start;
  }

  setLayout(layout) {
    this.globalstate.layout = layout;
    if (!this.globalstate.layout.modes.includes(this.globalstate.mode))
      this.setMode(this.globalstate.layout.modes[0]);
    for (let i in this.userstates) {
      this.userstates[i].requestReload();
      // this.userstates[i].initialize();
    }
  }

  setMode(mode) {
    if (this.globalstate.layout.modes.includes(mode)) {
      this.globalstate.mode = mode;
    }
  }

  setAuto(auto) {
    this.globalstate.auto = auto;
  }

  setSession(session) {
    this.globalstate.session = session;
    this.setLayout(Layouts.fromSession(session));
    if (session.type == "F") this.setSpeaker(null);
  }

  setSpeaker(speaker) {
    this.globalstate.speaker = speaker;
  }

  update() {
    this.setSession(
      SessionData.session.sessions[
        Math.floor(Math.random() * SessionData.session.sessions.length)
      ]
    );
  }

  receiveMessage(msg, res) {
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
    if (this.userstates[user] == null) {
      this.userstates[user] = new this.defaultPage(this, user, data, res);
    }

    let nextPage = this.userstates[user].handle(data, res);

    if (nextPage) {
      let page = new nextPage(this, user, data, res);
      console.log(page);
      if (page.checkPermission()) {
        this.userstates[user] = page;
      } else {
        res.textln("你沒有權限執行此項目");
        this.userstates[user] = new this.defaultPage(this, user, data, res);
      }
    }

    res.send();
  }
}

export default ControlBot;
