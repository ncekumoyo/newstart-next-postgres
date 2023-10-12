import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all programs
// GET /programs
// private, admin only
export async function getPrograms(req, res) {
  try {
    const orgId = Number(req.params.orgId) || null;
    const programs = orgId ? await prisma.program.findMany({ where: { orgId } }) : await prisma.program.findMany();
    res.status(200).json({ data: programs });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to retrieve programs." });
  }
}

// get programs for organization
// GET /programs/org/:id
// private, admin only and owner org user
/* export async function getProgramsForOrganization(req, res) {
  try {
    const { id } = req.params;
    const programs = await prisma.program.findMany({ where: { orgId: Number(id) } });
    res.status(200).json({ data: programs });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to retrieve programs." });
  }
} */

// get program by id
// GET /programs/:progId
// private, admin and owner org user
export async function getProgram(req, res) {
  try {
    const program = await prisma.program.findUnique({ where: { id: Number(req.params.progId) } });
    if (!program) {
      throw new Error("Program NOT FOUND.");
    } else {
      return res.status(200).json({ data: program });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// create a program
// POST /programs/:orgId
// private, only admin and org user
export async function createProgram(req, res) {
  try {
    const orgId = Number(req.params.orgId);
    const { title, status } = req.body;
    if (!title) {
      throw new Error("Title field is required.");
    }
    const existingProgram = await prisma.program.findFirst({ where: { orgId, title } });
    if (existingProgram) {
      throw new Error("A program wit that title already exists.");
    }
    const program = await prisma.program.create({
      data: {
        orgId,
        title,
        status,
      },
    });
    res.status(201).json({ data: program });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to create program." });
  }
}

// update a program
// PUT /programs/:progId
// private, admin only and owner org
export async function updateProgram(req, res) {
  try {
    const progId = Number(req.params.progId);
    const { title, status } = req.body;
    if (!title) {
      throw new Error("All fields are required.");
    }
    const program = await prisma.program.update({
      where: { id: progId },
      data: { title, status },
    });
    res.status(200).json({ data: program });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update program." });
  }
}

// delete a program
// DELETE /programs/:id
// private, admin and owner org
export async function deleteProgram(req, res) {
  try {
    const progId = Number(req.params.progId);
    const program = await prisma.program.delete({
      where: { id: progId },
    });
    res.status(200).json({ data: program });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update program." });
  }
}
