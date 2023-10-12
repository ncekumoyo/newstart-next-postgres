import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  try {
    const orgId = Number(params.orgId);
    const { title } = await req.json();
    if (!title) {
      throw new Error("All fields are required.");
    }
    const existingProgram = await prisma.program.findFirst({ where: { orgId, title } });
    if (existingProgram) {
      throw new Error("A program wit that title already exists.");
    }
    const program = await prisma.program.create({
      data: {
        orgId,
        title,
      },
    });
    return NextResponse.json({ status: 200, data: program });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
