import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  try {
    const oid = Number(params.orgId);
    const { forenames, lastname, address, phone, dob, gender, height, weight, waist } = await req.json();

    const profile = await prisma.profile.create({
      data: {
        forenames,
        lastname,
        address,
        phone,
        dob: dob ? new Date(dob) : null,
        gender,
        height: Number(height) || null,
        weight: Number(weight) || null,
        waist: Number(waist) || null,
        orgId: oid,
      },
    });
    return NextResponse.json({ status: 200, data: profile });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
