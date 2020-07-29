import permissions from "./permissions";

const roles = {
  // all permissions is avaliable for admin
  admin: Object.keys(permissions).map((key) => permissions[key]),
  // Scene
  sceneOp: [permissions.layoutControl, permissions.participate],
  // Session
  sessionOp: [permissions.sessionControl, permissions.participate],
  // only card control for forum operator
  forumOp: [
    permissions.ForumControl,
    permissions.forumCardControl,
    permissions.forumModeControl,
    permissions.participate,
  ],
  forumModeOp: [
    permissions.ForumControl,
    permissions.forumModeControl,
    permissions.participate,
  ],
  forumCardOp: [
    permissions.ForumControl,
    permissions.forumCardControl,
    permissions.participate,
  ],
  // default visitor have no permissions
  visitor: [],
};

export default roles;
