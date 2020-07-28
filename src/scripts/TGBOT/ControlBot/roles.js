import permissions from "./permissions";

const roles = {
  admin: Object.keys(permissions).map((key) => permissions[key]), // all permissions is avaliable for admin
  seminarOp: [permissions.seminarCardControl],
  people: [],
};

export default roles;
