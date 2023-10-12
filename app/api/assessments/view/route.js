import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const assessments = await prisma.assessment.findMany();
    return NextResponse.json({ status: 200, data: assessments });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
