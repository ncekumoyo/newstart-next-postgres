import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const profId = Number(params.profId);
    const profile = await prisma.profile.findUnique({
      where: { id: profId },
      include: { organization: { include: { profile: true } } },
    });
    if (!profile) {
      throw new Error("Error fetching profile");
    }
    return NextResponse.json({ status: 200, data: profile });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
