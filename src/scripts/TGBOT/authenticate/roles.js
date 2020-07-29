import permissions from "./permissions";

const roles = {
  // all permissions is avaliable for admin
  admin: Object.keys(permissions).map((key) => permissions[key]),
  // Scene
  sceneOp: [permissions.layoutControl],
  // Session
  sessionOp: [permissions.sessionControl],
  // only card control for forum operator
  forumOp: [
    permissions.ForumControl,
    permissions.forumCardControl,
    permissions.forumModeControl,
  ],
  forumModeOp: [permissions.ForumControl, permissions.forumModeControl],
  forumCardOp: [permissions.ForumControl, permissions.forumCardControl],
  // default people have no permissions
  people: [],
};

export default roles;
