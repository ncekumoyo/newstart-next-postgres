import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all assessments
// GET /assessments
// public
export async function getAssessments(req, res) {
  try {
    const assessments = await prisma.assessment.findMany();

    if (!assessments) {
      throw new Error("Could not retrieve assessments");
    }
    res.status(200).json({ data: assessments });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// get assessment by id
// GET /assessments/:assId
// public
export async function getAssessment(req, res) {
  try {
    const assessment = await prisma.assessment.findUnique({ where: { id: Number(req.params.assId) } });

    if (!assessment) {
      throw new Error("Assessment NOT FOUND.");
    }
    res.status(200).json({ data: assessment });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// create an assessment
// POST /assessments
// private, only admin
export async function createAssessment(req, res) {
  try {
    const { title, description, image, questions } = req.body;
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
    res.status(201).json({ data: assessment });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to create assessment." });
  }
}

// update an assessment
// PUT /assessments/:assId
// private, admin only
export async function updateAssessment(req, res) {
  try {
    const { title, description, image, questions } = req.body;
    const assessment = await prisma.assessment.update({
      where: { id: Number(req.params.assId) },
      data: { title, description, image, questions },
    });
    res.status(200).json({ data: assessment });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update assessment." });
  }
}

// delete an assessment
// DELETE /assessments/:id
// private, admin only
export async function deleteAssessment(req, res) {
  try {
    const assessment = await prisma.assessment.delete({
      where: { id: Number(req.params.assId) },
    });
    res.status(200).json({ data: assessment });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to update assessment." });
  }
}
