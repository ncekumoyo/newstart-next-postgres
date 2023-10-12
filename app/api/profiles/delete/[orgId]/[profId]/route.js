import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const orgId = Number(params.orgId);
    const profId = Number(params.profId);
    const profile = await prisma.profile.delete({
      where: { id: profId },
    });
    return NextResponse.json({ status: 200, data: profile });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
