import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfiles(orgId) {
  const profiles = orgId ? await prisma.profile.findMany({ where: { orgId } }) : await prisma.profile.findMany();
  return profiles;
}
