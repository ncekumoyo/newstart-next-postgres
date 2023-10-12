import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    //const orgId = Number(params.orgId);
    const progId = Number(params.progId);
    const programs = await prisma.program.findUnique({ where: { id: progId } });
    return NextResponse.json({ status: 200, data: programs });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
