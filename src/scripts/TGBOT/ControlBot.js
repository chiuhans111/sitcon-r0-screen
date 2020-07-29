import TelegramBot from "./TelegramBot";
import Start from "./Pages/Start";

import Layout from "../Scene/Layouts";

class ControlBot extends TelegramBot {
  constructor(token) {
    super(token);

    this.userstates = {};
    this.globalstate = {
      layout: Layout.STBY,
      mode: Layout.STBY.modes[0],
      auto: true,
      session: null,
    };

    this.defaultPage = Start;
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
        res.textln("注意 你可能沒有權限執行此項目");
      }
    }

    res.send();
  }
}

export default ControlBot;
