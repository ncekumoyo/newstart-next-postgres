import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const progId = Number(params.progId);
    const { title } = await req.json();
    if (!title) {
      throw new Error("All fields are required.");
    }
    const program = await prisma.program.update({
      where: { id: progId },
      data: { title },
    });
    return NextResponse.json({ status: 200, data: program });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
