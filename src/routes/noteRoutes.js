const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add/Update a Grade (POST/PUT)
router.post('/', async (req, res) => {
  const { idEtud, idMod, note } = req.body;
  try {
    const newNote = await prisma.note.upsert({
      where: { idEtud_idMod: { idEtud, idMod } },
      update: { note },
      create: { idEtud, idMod, note }
    });
    res.json(newNote);
  } catch (error) {
    res.status(400).json({ error: "Failed to add/update grade" });
  }
});

// Get a Student's Grade for a Module (GET)
router.get('/etudiant/:idEtud/module/:idMod', async (req, res) => {
  const idEtud = parseInt(req.params.idEtud);
  const idMod = parseInt(req.params.idMod);
  try {
    const grade = await prisma.note.findUnique({
      where: { idEtud_idMod: { idEtud, idMod } }
    });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grade" });
  }
});

// Delete a Grade (DELETE)
router.delete('/etudiant/:idEtud/module/:idMod', async (req, res) => {
  const idEtud = parseInt(req.params.idEtud);
  const idMod = parseInt(req.params.idMod);
  try {
    await prisma.note.delete({
      where: { idEtud_idMod: { idEtud, idMod } }
    });
    res.json({ message: "Grade deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete grade" });
  }
});

module.exports = router;