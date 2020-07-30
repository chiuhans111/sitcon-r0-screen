import permissions from "./permissions";

const roles = {
  // all permissions is avaliable for admin
  admin: {
    title: "管理員",
    permissions: Object.keys(permissions).map((key) => permissions[key]),
  },

  // all permission except for session control for staff
  staff: {
    title: "工人",

    permissions: [
      permissions.modeControl,
      permissions.forumControl,
      permissions.productionControl,
      permissions.participate,
    ],
  },

  // default visitor have no permissions
  visitor: {
    title: "一般人",
    permissions: [],
  },
};

export default roles;
