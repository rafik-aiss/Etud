const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all filières
router.get('/', async (req, res) => {
  try {
    const filieres = await prisma.filiere.findMany();
    res.json(filieres);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filières" });
  }
});

// POST a new filière
router.post('/', async (req, res) => {
  const { nom } = req.body;
  try {
    const newFiliere = await prisma.filiere.create({
      data: { nom }
    });
    res.json(newFiliere);
  } catch (error) {
    res.status(400).json({ error: "Failed to create filière" });
  }
});

// UPDATE a filière
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nom } = req.body;
  try {
    const updatedFiliere = await prisma.filiere.update({
      where: { idFil: id },
      data: { nom }
    });
    res.json(updatedFiliere);
  } catch (error) {
    res.status(400).json({ error: "Failed to update filière" });
  }
});

// DELETE a filière
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.filiere.delete({
      where: { idFil: id }
    });
    res.json({ message: "Filière deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete filière" });
  }
});

module.exports = router;