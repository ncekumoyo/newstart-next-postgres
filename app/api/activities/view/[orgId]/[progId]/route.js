import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const progId = Number(params.progId);
    const acts = await prisma.activity.findMany({
      where: { progId },
      include: {
        program: { include: { organization: { include: { profile: true } } } },
        profile: true,
        assessment: true,
      },
    });
    return NextResponse.json({ status: 200, data: acts });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
