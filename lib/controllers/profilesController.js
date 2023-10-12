import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all profiles
// GET /profiles
// private, admin or org or clerk
export async function getProfiles(req) {
  try {
    const { orgId } = req.nextUrl.searchParams;
    const profiles = orgId ? await prisma.profile.findMany({ where: { orgId } }) : await prisma.profile.findMany();
    if (!profiles) {
      throw new Error("Error fetching profiles");
    }
    return NextResponse.json({ status: 200, data: profiles });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}

// get profile by id
// GET /profiles/:id
// private, admin or owner user or org or clerk
export async function getProfile(req) {
  try {
    const { orgId, profId } = await req.json();
    const profile = await prisma.profile.findUnique({
      where: { id: profId },
      include: {
        organization: { select: { id: true, email: true, orgName: true } },
      },
    });
    if (!profile) {
      return new Error("Profile NOT FOUND");
    }
    return NextResponse.json({ status: 200, data: profile });
  } catch (e) {
    return NextResponse.json({ status: 400, error: e.message });
  }
}

// create an profile
// POST /profiles
// private, admin, org, clerk
export async function createProfile(req, res) {
  try {
    const { orgId } = await req.json();
    const { forenames, lastname, address, phone, dob, gender, height, weight, waist } = req.body;

    const profile = await prisma.profile.create({
      data: {
        forenames,
        lastname,
        address,
        phone,
        dob: dob ? new Date(dob) : null,
        gender,
        height: height || null,
        weight: Number(weight) || null,
        waist: Number(waist) || null,
        orgId: oid,
      },
    });
    res.status(201).json({ data: profile });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to create profile." });
  }
}

// update an profile
// PUT /profiles/:profId
// private, admin, owner, parent org, parent org clerk
export async function updateProfile(req, res) {
  try {
    const profId = Number(req.params.profId);
    const { forenames, lastname, email, address, phone, dob, gender, height, weight, waist } = req.body;

    const profile = await prisma.profile.update({
      where: { id: profId },
      include: { organization: true },
      data: {
        forenames,
        lastname,
        email,
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

    return res.status(200).json({
      data: {
        id: profile.id,
        forenames: profile.forenames,
        lastname: profile.lastname,
        address: profile.address,
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        waist: profile.waist,
        organization: profile.organization,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// delete an profile
// DELETE /profiles/:id
// private, admin only
export async function deleteProfile(req, res) {
  try {
    const { profId } = req.params;
    const profile = await prisma.profile.delete({
      where: { id: Number(profId) },
    });
    if (!profile) {
      throw new Error("Delete error");
    }
    res.status(200).json({ data: profile });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
