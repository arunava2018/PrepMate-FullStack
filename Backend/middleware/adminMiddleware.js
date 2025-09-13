import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Middleware to check if user is an admin
export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: no user found" });
    }

    const adminUser = await prisma.admin_users.findUnique({
      where: { id: userId },
    });

    if (!adminUser) {
      return res.status(403).json({ error: "Forbidden: admin access required" });
    }
    req.user.isAdmin = true;
    next();
  } catch (err) {
    console.error("Admin check failed:", err);
    res.status(500).json({ error: "Server error during admin check" });
  }
};
