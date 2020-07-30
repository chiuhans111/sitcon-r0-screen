import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";

import ProductionPage from "./ProductionPage";
import SessionPage from "./SessionPage";
import AdminPage from "./AdminPage";
// import Forum from "./Forum";

class Start extends Page {
  // checkPermission() {
  //   return guardian.check(this.user, this.permissions);
  // }

  initialize() {
    this.name = "SITCON 2020 控制台";
    this.permissions = [];
    console.log("起始畫面");
    this.res.textln("welcome @" + this.user + " !");
    this.res.textln("你能使用的權限：");
    this.res.textln(
      guardian
        .see(this.user)
        .map((x) => x.title)
        .join("、")
    );

    
    this.addBtn("導播", [permissions.productionControl], () => ProductionPage);
    this.addBtn("議程", [permissions.sessionControl], () => SessionPage);
    this.addBtn("管理", [permissions.admin], () => AdminPage);
  }
}

export default Start;
