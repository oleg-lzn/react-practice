import jwt from "jsonwebtoken";
import { env } from "../env.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // 🔥 теперь тут есть и id, и role
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireRole = role => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (req.user.role !== role) {
    return res.status(403).json({ error: "Nah. Insufficient access level" });
  }
  next();
};

// на контроллере
// Роль хранится в токене, который выписывается пользователю при сайн апе и кладется туда
// 1 мидлвэр достает пэйлоад и кладет его в req.user, второй проверяет роль

app.get("/api/admin/users", authenticate, requireRole("admin"), getUsers);
app.delete(
  "/api/admin/posts",
  authenticate,
  requireRole("moderator"),
  deletePosts
);
