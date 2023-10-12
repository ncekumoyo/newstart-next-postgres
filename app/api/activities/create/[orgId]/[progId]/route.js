import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  try {
    const progId = Number(params.progId);
    const { profId, assId } = await req.json();
    if (!profId || !assId) {
      throw new Error("Some required fields are missing.");
    }
    const act = await prisma.activity.create({
      data: {
        progId,
        profId: Number(profId),
        assId: Number(assId),
      },
    });
    return NextResponse.json({ status: 200, data: act });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
