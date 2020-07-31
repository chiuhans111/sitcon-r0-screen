import config from "../../../../config";
import roles from "./roles";
import permissions from "./permissions";

let defaultRole = roles.visitor;

let roleConfig = {};

for (let user in config.bots.Control.roles) {
  roleConfig[user] = roles[config.bots.Control.roles[user]] || defaultRole;
}

if (localStorage.guardian_roleConfig) {
  try {
    roleConfig = JSON.parse(localStorage.guardian_roleConfig);
    for (let user in roleConfig) {
      roleConfig[user] = roles[roleConfig[user]] || defaultRole;
    }
  } catch (e) {
    console.log(e);
  }
}

function see(user) {
  return (roleConfig[user] || defaultRole).permissions;
}

function check(user, permissions) {
  console.log(user, permissions);
  if (permissions.length == 0) return true;
  let role = see(user);
  return permissions.every((p) => role.includes(p));
}

function grant(user, role) {
  if (role == roles.admin) return false;
  roleConfig[user] = role;
  saveState();
  return true;
}

function ban(user) {
  if (check(user, [permissions.admin])) return false;
  delete roleConfig[user];
  saveState();
  return true;
}

function saveState() {
  let savedstate = {};
  for (let i in roleConfig) {
    savedstate[i] = roleConfig[i].id;
  }
  localStorage.guardian_roleConfig = JSON.stringify(savedstate);
}

export default {
  see,
  check,
  grant,
  ban,
  roleConfig,
};
