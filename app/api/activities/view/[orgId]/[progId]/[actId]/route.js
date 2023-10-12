import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const actId = Number(params.actId);
    const activity = await prisma.activity.findUnique({
      where: { id: actId },
      include: { program: true, profile: true, assessment: true },
    });
    return NextResponse.json({ status: 200, data: activity });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
