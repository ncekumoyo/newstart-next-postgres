import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const orgId = Number(params.orgId);
    const profId = Number(params.profId);
    const { forenames, lastname, address, phone, dob, gender, height, weight, waist } = await req.json();

    const profile = await prisma.profile.update({
      where: { id: profId },
      include: { organization: true },
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
      },
    });
    if (!profile) {
      throw new Error("Profile NOT FOUND.");
    }

    return NextResponse.json({
      status: 200,
      data: {
        id: profile.id,
        forenames: profile.forenames,
        lastname: profile.lastname,
        address: profile.address,
        phone: profile.phone,
        dob: profile.dob,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        waist: profile.waist,
        orgId: profile.orgId,
      },
    });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}
