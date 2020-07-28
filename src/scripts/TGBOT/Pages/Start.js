import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";

import Scene from "./Scene";

class Start extends Page {
  name = "SITCON 2020 控制台";

  permissions = [permissions.visit];

  checkPermission() {
    return guardian.check(this.user, this.permissions);
  }

  initialize() {
    this.res.textln("welcome " + this.user + " !");
    this.res.textln("你能使用的權限：");
    this.res.textln(
      guardian
        .see(this.user)
        .map((x) => x.title)
        .join("、")
    );

    this.addBtn("Scene", [permissions.layoutControl], function() {
      return Scene;
    });
  }
}

export default Start;
