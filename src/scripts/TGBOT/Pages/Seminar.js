// import guardian from "../authenticate/guardian";
import permissions from "../authenticate/permissions";
import Page from "./Page";
// import Layouts from "../../Scene/Layouts";

import Start from "./Start";
import Session from "./Session";
import Scene from "./Scene";

class Seminar extends Page {
  initialize() {
    this.name = "論壇字卡";
    this.permissions = [permissions.seminarCardControl];

    this.addBtn("←BACK", [], () => Start);
    this.addBtn("導播", [permissions.seminarCardControl], () => Scene);
    this.addBtn("議程", [permissions.sessionControl], () => Session);

    this.res.addBtnRow();
  }
}

export default Seminar;
