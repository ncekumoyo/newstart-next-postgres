import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { title, description, image, questions } = await req.json();
    if (!title || !description) {
      throw new Error("All fields are required.");
    }
    const assessment = await prisma.assessment.create({
      data: {
        title,
        description,
        image,
        questions: JSON.stringify(questions),
      },
    });
    return NextResponse.json({ status: 200, data: assessment });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
