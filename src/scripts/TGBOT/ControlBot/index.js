import TelegramBot from "../TelegramBot";
import Layouts from "../../Scene/Layouts";
import guardian from "./guardian";
import permissions from "./permissions";
import session from "../../Session";

console.log(session);

class UserState {
  page = "main";
}

let commandMap = {
  start: {
    permissions: [permissions.visit],
    to: ["scene", "session", "card"],
  },
  scene: {
    permissions: [permissions.layoutControl],
  },
  session: {
    permissions: [permissions.sessionControl],
  },
  card: {
    permissions: [permissions.seminarCardControl],
  },
};

class ControlBot extends TelegramBot {
  constructor(token) {
    super(token);
    this.layout = Layouts.STBY;
    this.mode = this.layout.modes[0];
    this.userstates = {};
  }
  receiveMessage(message, res) {
    if (!message.chat.username) return;
    let username = message.chat.username;

    if (this.userstates[username]) {
      this.userstates[username] = new UserState();
    }

    console.log(message, username);

    res.setText("如果選單沒出現 /start\n");

    if (message.text) {
      let command_match = message.text.match(/\/([^\s]+)(\s(.+))?/);
      if (command_match) {
        let command = command_match[1];
        let args = command_match[3];
        console.log(args);
        if (commandMap[command]) {
          if (guardian.check(username, commandMap[command].permissions)) {
            if (commandMap[command].to) {
              commandMap[command].to.map((x) => {
                if (commandMap[x]) {
                  if (guardian.check(username, commandMap[x].permissions)) {
                    res.addBtn("/" + x);
                  }
                }
              });
            }

            if (command == "start") {
              res.textln("welcome, " + username);
              res.textln(
                "你有以下權限：" +
                  guardian
                    .see(username)
                    .map((x) => x.title)
                    .join(",")
              );
            } else if (command == "scene") {
              this.layout.modes.map((x) => {
                res.addInlineBtn(x, "/layout " + x);
              });
              for (let i in Layouts) {
                res.addBtn(i);
              }
            }
          } else {
            res.textln(`${username} 你沒有 ${command} 的權限`);
          }
        }
      }
    }

    res.send();
  }

  receiveCallback(callback, res) {
    console.log("it a callback");
    // res.setText(callback.data);

    let user = callback.from.username;

    if (callback.data.startsWith("/layout")) {
      if (guardian.check(user, [permissions.layoutControl])) {
        let layout = callback.data.substr(8);
        if (Layouts[layout]) {
          this.layout = Layouts[layout];
        }
      }
    }

    res.send();
  }
}

export default ControlBot;
