// import permissions from "../authenticate/permissions";
import Page from "./Page";

class VisitorPage extends Page {
  initialize() {
    this.name = "SITCON 2020 控制台";
    this.permissions = [];
  }
}

export default VisitorPage;
