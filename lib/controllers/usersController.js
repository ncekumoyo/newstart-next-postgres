import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

const prisma = new PrismaClient();

// login user
// POST /users/login
// public
export async function loginUser(req, res) {
  try {
    const { email, pwd } = req.body;

    if (!email || !pwd) {
      throw new Error("All fields are required.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new Error("User DOES NOT EXIST");
    }

    const { password, ...userWithoutPassword } = existingUser;

    if (await bcrypt.compare(pwd, password)) {
      const token = jwt.sign(userWithoutPassword, process.env.JWT_KEY, { expiresIn: "24h" });

      if (!token) {
        throw new Error("Could not sign token");
      }

      res.status(200).json({
        data: {
          ...userWithoutPassword,
          token,
        },
      });
    } else {
      throw new Error("Password error");
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// get all users
// GET /users
// private, admin only
export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();

    const cleanedUsers = users.map((u) => {
      const { password, ...rest } = u;
      return rest;
    });

    res.status(200).json({ data: cleanedUsers });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// get user by id
// GET /users/:userId
// private, admin and account owner
export async function getUser(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.userId) } });
    const { password, ...rest } = user;
    res.status(200).json(rest);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// create an user
// POST /users
// public
export async function registerUser(req, res) {
  try {
    const { email, pwd, type, orgName } = req.body;

    if (!email || !pwd || !type || !orgName) {
      throw new Error("All fields are required.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("User with that email already exists.");
    }

    const hashedPassword = await bcrypt.hash(pwd, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type,
        orgName,
      },
    });

    if (!user) {
      throw new Error("Invalid user data.");
    }

    const { password, ...userWithoutPassword } = user;

    const token = jwt.sign(userWithoutPassword, process.env.JWT_KEY, { expiresIn: "24h" });

    res.status(201).json({
      data: { ...userWithoutPassword, token },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
