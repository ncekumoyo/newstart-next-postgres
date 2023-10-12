import React from "react";
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, pwd } = await req.json();

    if (!email || !pwd) {
      throw new Error("All fields are required.");
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new Error("User DOES NOT EXIST");
    }

    const match = await bcrypt.compare(pwd, existingUser.password);

    if (!match) {
      throw new Error("INCORRECT password");
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        type: existingUser.type,
        profId: existingUser.profId,
        orgId: existingUser.orgId,
        verified: existingUser.verified,
      },
      process.env.NEXT_PUBLIC_JWT_KEY,
      { expiresIn: "24h" }
    );

    if (!token) {
      throw new Error("Could not sign token");
    }

    return NextResponse.json({
      data: {
        id: existingUser.id,
        email: existingUser.email,
        type: existingUser.type,
        profId: existingUser.profId,
        orgId: existingUser.orgId,
        verified: existingUser.verified,
        token,
      },
    });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
