// Define roles and permissions
const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
};

const PERMISSIONS = {
  READ_POSTS: "read:posts",
  WRITE_POSTS: "write:posts",
  DELETE_POSTS: "delete:posts",
  MANAGE_USERS: "manage:users",
};

const ROLE_PERMISSIONS = {
  user: [PERMISSIONS.READ_POSTS],
  moderator: [PERMISSIONS.READ_POSTS, PERMISSIONS.WRITE_POSTS],
  admin: [
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS,
    PERMISSIONS.MANAGE_USERS,
  ],
};

// Возврат возможных допусков по роли
function getUserPermissions(role) {
  return ROLE_PERMISSIONS[role] || [];
}

// Authorization middleware
const authorize = permissions => {
  return (req, res, next) => {
    const userPermissions = getUserPermissions(req.user.role);

    const hasPermission = permissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};

// Usage
router.delete(
  "/posts/:id",
  authenticate, // First authenticate
  authorize([PERMISSIONS.DELETE_POSTS]), // Then authorize
  deletePost
);
