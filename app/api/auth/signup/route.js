import React from "react";
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";

export async function POST(req) {
  try {
    const { email, pwd, type, orgName } = await req.json();
    if (!email || !pwd || !type) {
      throw new Error("Required fields are missing.");
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("User with that email already exists.");
    }

    const profile = orgName ? await prisma.profile.create({ data: { orgName } }) : await prisma.profile.create();
    const hashedPassword = await bcrypt.hash(pwd, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type,
        profId: profile.id,
      },
    });

    if (!user) {
      throw new Error("Invalid user data.");
    }

    /* const otp = await prisma.otp.create({
      data: {
        email: user.email,
        otp: otpGenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false }),
      },
    }); */
    // TODO: send email or text to phone containing otp

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        type: user.type,
        profId: user.profId,
        orgId: user.orgId,
        verified: user.verified,
      },
      process.env.NEXT_PUBLIC_JWT_KEY,
      { expiresIn: "24h" }
    );
    return NextResponse.json({
      status: 201,
      data: {
        id: user.id,
        email: user.email,
        type: user.type,
        profId: user.profId,
        orgId: user.orgId,
        verified: user.verified,
        token,
      },
    });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
