import config from "../../../../config";
import roles from "./roles";

let defaultRole = roles.visitor;

let roleConfig = {};

for (let user in config.bots.Control.roles) {
  roleConfig[user] = roles[config.bots.Control.roles[user]] || defaultRole;
}

function see(user) {
  return roleConfig[user] || defaultRole;
}

function check(user, permissions) {
  if (permissions.length == 0) return true;
  let role = see(user);
  return permissions.every((p) => role.includes(p));
}

function grant(user, role) {
  roleConfig[user] = role;
}

export default {
  see,
  check,
  grant,
};
