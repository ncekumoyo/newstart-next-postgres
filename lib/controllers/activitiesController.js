import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all activities
// GET /activities
// private, admin
export async function getActivities(req, res) {
  try {
    const { orgId } = Number(req.params.orgId);
    const { profId } = Number(req.params.profId);

    const activities = await prisma.activity.findMany({
      where: { orgId, profId },
      include: { program: true, assessment: true },
    });

    res.status(200).json({ data: activities });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// get activities for org
// GET /activities/org/:id
// private, admin
export async function getActivitiesForOrganization(req, res) {
  try {
    const id = Number(req.params.id);
    const org = await prisma.user({ where: { id }, include: { profile: true } });
    const progs = await prisma.program.findMany({ where: { profId: org.profile.id }, include: { activities: true } });
    const activities = progs.map((p) => {
      p.activities.map((a) => a);
    });
    res.status(200).json({ data: activities });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to retrieve activities." });
  }
}

// get activity by id
// GET /activities/:id/:actId
// public
export async function getActivity(req, res) {
  try {
    const currentUser = req.user;

    const actId = Number(req.params.actId);
    const activity = await prisma.activity.findUnique({
      where: { id: actId },
      include: {
        program: true,
        profile: { include: { organization: { include: { profile: true } } } },
        assessment: true,
      },
    });
    res.status(200).json({ data: activity });
  } catch (e) {
    res.status(400).json({ error: e.message, message: "Failed to retrieve activity." });
  }
}

// get activity by id
// GET /activities/:id
// public
export async function getActivitiesForClient(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!user) {
      throw new Error("User NOT FOUND");
    }
    const activity = await prisma.activity.findMany({ where: { profId: user.pId } });
    res.status(200).json({ data: activity });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to retrieve activities for client." });
  }
}

// create an activity
// POST /activities/:id
// private, admin, org and current user
export async function createActivity(req, res) {
  try {
    const { progId, profId, assId } = req.body;

    if (!progId || !profId || !assId) {
      throw new Error("Some required fields are missing.");
    }

    const activity = await prisma.activity.create({ data: { progId, profId, assId } });

    if (!activity) {
      throw new Error("Failed to create activity.");
    }
    res.status(201).json({ data: activity });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// update an activity
// PUT /activities/:id/:actId
// private, admin,
export async function updateActivity(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!user) {
      throw new Error("User NOT FOUND");
    }
    const { answers, results, recommendations, completed } = req.body;
    const activity = await prisma.activity.update({
      where: { id: Number(id) },
      data: { answers, results, recommendations, completed },
    });
    res.status(200).json({ data: activity });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update activity." });
  }
}

// delete an activity
// DELETE /activities/:id
// private, admin only
export async function deleteActivity(req, res) {
  try {
    const { id } = req.params;
    const activity = await prisma.activity.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ data: activity });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update activity." });
  }
}
