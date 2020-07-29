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

    this.btns = [];
    this.inlineBtns = [];
    this.initialize();

    this.res.setText(this.name + "\n");
  }

  addBtn(text, permissions, callback) {
    if (guardian.check(this.user, permissions)) {
      this.btns.push({ text, permissions, callback });
      this.res.addBtn(text);
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

  initialize() {
    this.res.setText("welcome " + this.user);
  }

  checkPermission() {
    return guardian.check(this.user, this.permissions);
  }

  handle(data, res) {
    console.log(data, res);

    if (data.message) {
      if (data.text == "/start") return this.bot.defaultPage;
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
