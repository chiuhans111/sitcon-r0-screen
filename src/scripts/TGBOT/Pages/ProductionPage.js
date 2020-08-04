// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
import Layouts from "../../Scene/Layouts";
import Speakers from "../../Scene/Speakers";
import Start from "./Start";
import SessionPage from "./SessionPage";

class ProductionPage extends Page {
  initialize() {
    this.name = "版型控制";
    this.permissions = [permissions.productionControl];
    let me = this;

    // 版型

    me.bot.globalstate.layout.modes.map((mode) => {
      let btnText = mode;
      if (this.bot.globalstate.mode == mode) btnText = "[" + btnText + "]";

      this.addBtn(btnText, [permissions.modeControl], function() {
        me.bot.setMode(mode);
      });
    });

    this.res.addBtnRow();

    // 專屬論壇

    if (me.bot.globalstate.layout == Layouts.Forum) {
      for (let i in Speakers) {
        let btnText = Speakers[i].name;
        if (this.bot.globalstate.speaker == Speakers[i])
          btnText = "[" + btnText + "]";
        this.addBtn(btnText, [permissions.forumControl], function() {
          me.bot.setSpeaker(Speakers[i]);
        });
      }

      this.res.addBtnRow();
      this.addBtn("清空字卡", [permissions.forumControl], function() {
        me.bot.setSpeaker(null);
      });
    }

    this.res.addBtnRow();


    this.addBtn("↓", [permissions.admin], () => Start);
    this.addBtn("議程", [permissions.sessionControl], () => SessionPage);
  }
}

export default ProductionPage;
