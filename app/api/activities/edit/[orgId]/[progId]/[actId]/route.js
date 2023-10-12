import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const actId = Number(params.actId);
    const { answers, results, recommendations, completed } = await req.json();
    const activity = await prisma.activity.update({
      where: { id: actId },
      data: { answers, results, recommendations, completed },
    });
    return NextResponse.json({ status: 200, data: activity });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
