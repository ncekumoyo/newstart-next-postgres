import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const progId = Number(params.progId);
    const program = await prisma.program.delete({
      where: { id: progId },
    });
    return NextResponse.json({ status: 200, data: program });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
