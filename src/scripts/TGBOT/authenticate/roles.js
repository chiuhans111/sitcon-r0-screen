import permissions from "./permissions";

const roles = {
  // all permissions is avaliable for admin
  admin: Object.keys(permissions).map((key) => permissions[key]),
  // only card control for seminar operator
  seminarOp: [permissions.seminarCardControl],
  // default people have no permissions
  people: [],
};

export default roles;
