/* This controller is to check whether the current logged in user is an admin
 or not
*/
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const isAdmin = async (req, res) => {
  try {
    const adminUser = await prisma.admin_users.findUnique({
      where: { id: req.user.userId },
    });
    if (!adminUser) {
      return res.status(403).json({ error: 'Access denied: not an admin' });
    }
    res.json({ message: 'User is an admin', admin: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while checking admin status' });
  }
};
