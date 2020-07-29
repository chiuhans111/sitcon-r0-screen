import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";

class Page {
  name = "預設頁面";
  permissions = [permissions.visit];
  constructor(bot, user, data, res) {
    this.bot = bot;
    this.user = user;
    this.data = data;
    this.res = res;

    this.reload();
  }

  addBtn(text, permissions, callback) {
    if (guardian.check(this.user, permissions)) {
      this.btns.push({ text, permissions, callback });
      this.res.addBtn(text);
    }
  }

  addCommand(command, permissions, callback) {
    if (guardian.check(this.user, permissions)) {
      this.commands.push({ command, permissions, callback });
    }
  }

  inlineCounter = 0;
  addInlineBtn(text, permissions, callback) {
    let cbid = Math.random() + "_" + (this.inlineCounter++ % 100);
    if (guardian.check(this.user, permissions)) {
      this.inlineBtns.push({ cbid, permissions, callback });
      this.res.addInlineBtn(text, cbid);
    }
  }

  reload() {
    this.btns = [];
    this.inlineBtns = [];
    this.commands = [];

    this.res.reset();
    this.initialize();
    this.res.textln(this.name);
    // this.res.send();
    // this.res.reset();

    this.pandingReload = false;
  }

  requestReload() {
    if (!this.pandingReload) {
      let me = this;
      this.res.reset();
      this.res.textln("狀態更新 /update");
      this.addCommand("/update", this.permissions, function() {
        me.reload();
      });
      this.res.send();
    }
    this.pandingReload = true;
  }

  initialize() {
    this.res.setText("welcome " + this.user);
  }

  checkPermission() {
    return guardian.check(this.user, this.permissions);
  }

  handle(data, res) {
    console.log(data, res);
    this.data = data;
    this.res = res;

    if (data.message) {
      if (data.text == "/start") return this.bot.defaultPage;
      for (let command of this.commands) {
        if (data.text == command.command) {
          if (guardian.check(this.user, command.permissions)) {
            return command.callback();
          }
        }
      }
      for (let btn of this.btns) {
        if (data.text == btn.text) {
          if (guardian.check(this.user, btn.permissions)) {
            return btn.callback();
          }
        }
      }
    } else if (data.callback) {
      for (let btn of this.inlineBtns) {
        if (data.text == btn.cbid) {
          if (guardian.check(this.user, btn.permissions)) {
            return btn.callback();
          }
        }
      }
    }

    return false;
  }
}

export default Page;
