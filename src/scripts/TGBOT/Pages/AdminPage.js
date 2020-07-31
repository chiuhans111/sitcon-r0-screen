import permissions from "../authenticate/permissions";
import guardian from "../authenticate/guardian";
import Page from "./Page";
import Start from "./Start";
import roles from "../authenticate/roles";

import TGBOT from "../../TGBOT";

class AdminPage extends Page {
  initialize() {
    // let me = this;
    this.name = "ADMIN";
    this.permissions = [permissions.admin];

    this.addBtn("權限管理", this.permissions, () => AdminPermissionPage);

    this.addBtn("IRC管理", this.permissions, () => AdminIRCPage);

    this.res.addBtnRow();
    this.addBtn("↓", this.permissions, () => Start);
  }
}

class AdminPermissionPage extends Page {
  initialize() {
    // let me = this;
    this.name = "ADMIN 權限管理";
    this.permissions = [permissions.admin];

    for (let i in guardian.roleConfig) {
      let config = guardian.roleConfig[i];
      this.addBtn(`[${config.title}] ${i}`, this.permissions, () => {
        return PermissionModify(i);
      });
      this.res.addBtnRow();
    }

    this.addBtn("↓", this.permissions, () => Start);
  }
}

function PermissionModify(user) {
  return class AdminPermissionModifyPage extends Page {
    initialize() {
      this.name = "ADMIN 管理 @" + user;
      this.permissions = [permissions.admin];

      this.res.textln(`目前：[${guardian.roleConfig[user].title}]`);
      this.addInlineBtn("移除", this.permissions, () => {
        if (guardian.ban(user)) {
          this.res.textln("成功");
        } else {
          this.res.textln("失敗");
        }
        this.res.send();
        return AdminPermissionPage;
      });

      for (let i in roles) {
        if (i != guardian.roleConfig[user])
          this.addInlineBtn(i, this.permissions, () => {
            if (guardian.grant(user, roles[i])) {
              this.res.textln("成功");
            } else {
              this.res.textln("失敗");
            }
            this.res.send();
            return AdminPermissionPage;
          });
      }
      this.res.addInlineBtnRow();

      this.addBtn("↓", this.permissions, () => Start);
    }
  };
}

class AdminIRCPage extends Page {
  initialize() {
    // let me = this;
    this.name = "ADMIN IRC管理";
    this.permissions = [permissions.admin];

    this.addBtn("清空IRC", this.permissions, () => {
      TGBOT().ircBot.clear()
    });
    this.addBtn("↓", this.permissions, () => Start);

    this.res.addBtnRow();
  }
}

export default AdminPage;
