import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const actId = Number(params.actId);
    const activity = await prisma.activity.delete({
      where: { id: actId },
    });
    return NextResponse.json({ status: 200, data: activity });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
