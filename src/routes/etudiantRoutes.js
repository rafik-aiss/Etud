const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all students
router.get('/', async (req, res) => {
  try {
    const etudiants = await prisma.etudiant.findMany();
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// In etudiantRoutes.js
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const student = await prisma.etudiant.findUnique({
      where: { idEtud: id }
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// Create a student
router.post('/', async (req, res) => {
  const { nom, prenom, tel, email, adresse, idFil } = req.body;
  try {
    const newEtudiant = await prisma.etudiant.create({
      data: { nom, prenom, tel, email, adresse, idFil }
    });
    res.json(newEtudiant);
  } catch (error) {
    res.status(400).json({ error: "Failed to create student" });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nom, prenom, tel, email, adresse, idFil } = req.body;
  try {
    const updatedEtudiant = await prisma.etudiant.update({
      where: { idEtud: id },
      data: { nom, prenom, tel, email, adresse, idFil }
    });
    res.json(updatedEtudiant);
  } catch (error) {
    res.status(400).json({ error: "Failed to update student" });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.etudiant.delete({
      where: { idEtud: id }
    });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete student" });
  }
});
// Get grades for a student
// Get grades for a student (with module details)
router.get('/:id/grades', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const grades = await prisma.note.findMany({
      where: { idEtud: id },
      include: { module: true } // Include module details
    });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grades" });
  }
});

module.exports = router;