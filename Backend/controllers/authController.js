/* This controller handles authentication-related tasks:
   - signup
   - login
   - get current user
   - get user by id
*/

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// -------- SIGN UP --------
export const signup = async (req, res) => {
  try {
    const { full_name, email, password, college_name, passout_year } = req.body;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Always create as normal user
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        full_name,
        college_name,
        passout_year,
        role: "user", // enforced
      },
    });

    // Newly created users are never admins
    const isAdmin = false;

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        college_name: user.college_name,
        passout_year: user.passout_year,
        role: user.role,
        isAdmin,
        profile_photo: user.profile_photo,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// -------- LOGIN --------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    // 🔎 Check if this user is in admin_users
    const adminRecord = await prisma.admin_users.findUnique({
      where: { id: user.id },
    });

    const isAdmin = !!adminRecord;

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        isAdmin,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        college_name: user.college_name,
        passout_year: user.passout_year,
        role: user.role,
        isAdmin,
        profile_photo: user.profile_photo,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login error. Please try again later." });
  }
};

// -------- CURRENT USER (via token) --------
export const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.users.findUnique({
      where: { id: req.user.id || req.user.userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        college_name: true,
        passout_year: true,
        role: true,
        profile_photo: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      ...user,
      isAdmin: req.user.isAdmin || false,
    });
  } catch (err) {
    console.error("Me endpoint error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// -------- GET USER BY ID --------
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        full_name: true,
        college_name: true,
        passout_year: true,
        role: true,
        profile_photo: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Also check if this user is admin
    const adminRecord = await prisma.admin_users.findUnique({
      where: { id: user.id },
    });

    res.json({
      ...user,
      isAdmin: !!adminRecord,
    });
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ error: "Could not fetch user" });
  }
};
