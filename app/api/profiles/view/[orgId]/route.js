import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const orgId = Number(params.orgId);
    const profiles = await prisma.profile.findMany({
      where: { orgId },
      include: { organization: { include: { profile: true } } },
    });
    if (!profiles) {
      throw new Error("Error fetching profiles");
    }
    return NextResponse.json({ status: 200, data: profiles });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
