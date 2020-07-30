// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
// import Layouts from "../../Scene/Layouts";

import Start from "./Start";
import Scene from "./Scene";
import Session from "./Session";
import Forum from "./Forum";

class Admin extends Page {
  initialize() {
    // let me = this;
    this.name = "ADMIN";
    this.permissions = [permissions.admin];

    this.addBtn("權限管理");

    this.addBtn("聊天室管理");

    this.res.addBtnRow();

    this.addBtn("回主畫面", [], () => Start);
    this.addBtn("導播", [permissions.layoutControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);
    this.addBtn("論壇", [permissions.forumCardControl], () => Forum);
  }
}

export default Admin;
