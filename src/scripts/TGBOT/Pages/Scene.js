// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
import Layouts from "../../Scene/Layouts";

// import Layout from "../../Scene/Layouts";
function Pusher(layout, parent) {
  return class Push extends Page {
    initialize() {
      this.name = "控制台：" + layout.title;
      this.permissions = [permissions.layoutControl];
      this.parent = parent;
      let me = this;

      this.bot.globalstate.layout.modes.map((mode) => {
        console.log(mode);
        this.addInlineBtn(mode, this.permissions, function() {
          me.bot.globalstate.mode = mode;
        });
      });

      // this.addBtn("Scene", this.permissions, function() {
      //   return Scene;
      // });
    }

    handle(data, res) {
      if (super.handle(data, res) === false) {
        console.log("passing");
        return this.parent.handle(data, res);
      }
    }
  };
}

class Scene extends Page {
  initialize() {
    let me = this;
    this.name = "場景選擇";
    this.permissions = [permissions.layoutControl];
    for (let layout in Layouts) {
      this.addBtn(layout, this.permissions, function() {
        me.bot.globalstate.layout = Layouts[layout];
        return Pusher(Layouts[layout], me);
      });
    }
  }
}

export default Scene;
