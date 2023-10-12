import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const profiles = await prisma.profile.findMany();
    if (!profiles) {
      throw new Error("Error fetching profiles");
    }
    return NextResponse.json({ status: 200, data: profiles });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
