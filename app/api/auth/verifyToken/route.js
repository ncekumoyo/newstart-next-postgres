import React from "react";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token } = await req.json();
    let verified;
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY, (err, decoded) => {
      if (err) {
        throw new Error("Invalid token");
      }
      return NextResponse.json({ status: 200, data: { verified: true } });
    });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
