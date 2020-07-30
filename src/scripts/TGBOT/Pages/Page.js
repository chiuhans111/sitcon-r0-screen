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
    this.rand = Math.random();

    this.reset();
    this.initialize();
    this.res.textln(this.name);

    if (guardian.check(this.user, this.permissions)) {
      this.res.send();
      console.log("send initiated page");
    }
  }

  reset() {
    this.btns = [];
    this.inlineBtns = [];
    this.inputs = null;
    this.commands = [];
    this.res.reset();
    this.inlineCounter = 0;
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

  addInlineBtn(text, permissions, callback) {
    let cbid = this.rand + "_" + (this.inlineCounter++ % 100);
    if (guardian.check(this.user, permissions)) {
      this.inlineBtns.push({ cbid, permissions, callback });
      this.res.addInlineBtn(text, cbid);
    }
  }

  input(question, permissions, callback) {
    if (guardian.check(this.user, permissions)) {
      this.res.textln(question);
      this.res.send();
      this.inputs = { permissions, callback };
    }
  }

  pendingReloadMsg = [];
  pendingReload = null;

  reload(msg) {
    this.pendingReloadMsg.push(msg);

    if (this.pendingReload) {
      clearTimeout(this.pendingReload);
    }

    this.pendingReload = setTimeout(() => {
      this.reset();
      this.initialize();
      this.res.setText(this.pendingReloadMsg.join("\n"));

      if (this.inlineBtns.length == 0) this.res.send();
      else this.res.editInlineKeyboard();

      this.res.reset();
      this.pendingReload = null;
      this.pendingReloadMsg = [];
    }, 0);
  }

  // requestReload() {
  //   if (!this.pandingReload) {
  //     let me = this;
  //     this.res.reset();
  //     this.res.textln("狀態更新 /update");
  //     this.addCommand("/update", this.permissions, function() {
  //       me.reload();
  //     });
  //     this.res.send();
  //   }
  //   this.pandingReload = true;
  // }

  initialize() {
    this.res.setText("welcome " + this.user);
  }

  checkPermission() {
    return guardian.check(this.user, this.permissions);
  }

  cleanText(text) {
    if (text[0] == ">") text = text.substr(1);
    if (text[0] == "[") text = text.substr(1, text.length - 2);
    return text;
  }

  handle(data, res) {
    console.log(data, res);
    this.data = data;
    this.res = res;

    if (data.message && data.text) {
      if (data.text == "/start") return this.bot.defaultPage;

      if (this.inputs) {
        if (guardian.check(this.user, this.inputs.permissions)) {
          return this.inputs.callback(data.text);
        }
      }

      for (let command of this.commands) {
        if (data.text == command.command) {
          if (guardian.check(this.user, command.permissions)) {
            return command.callback();
          }
        }
      }
      let inText = this.cleanText(data.text);
      for (let btn of this.btns) {
        if (inText == this.cleanText(btn.text)) {
          if (guardian.check(this.user, btn.permissions)) {
            return btn.callback();
          }
        }
      }
    } else if (data.callback && data.text) {
      for (let btn of this.inlineBtns) {
        if (data.text == btn.cbid) {
          if (guardian.check(this.user, btn.permissions)) {
            return btn.callback();
          }
        }
      }
    } else {
      this.res.setText("我看不懂@@");
      this.res.send();
      return null;
    }

    this.res.send();

    return false;
  }
}

export default Page;
