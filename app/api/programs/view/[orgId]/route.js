import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const orgId = Number(params.orgId);
    const programs = await prisma.program.findMany({ where: { orgId } });
    return NextResponse.json({ status: 200, data: programs });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
