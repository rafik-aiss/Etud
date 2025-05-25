const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Associate a Module with a Filière (POST)
router.post('/', async (req, res) => {
  const { idFil, idMod } = req.body;
  try {
    const association = await prisma.filiereModule.create({
      data: { idFil, idMod }
    });
    res.json(association);
  } catch (error) {
    res.status(400).json({ error: "Failed to create association" });
  }
});

// Remove a Module from a Filière (DELETE)
router.delete('/:idFil/:idMod', async (req, res) => {
  const idFil = parseInt(req.params.idFil);
  const idMod = parseInt(req.params.idMod);
  try {
    await prisma.filiereModule.delete({
      where: { idFil_idMod: { idFil, idMod } }
    });
    res.json({ message: "Association deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete association" });
  }
});

// Get all Modules for a Filière (GET)
router.get('/filiere/:idFil', async (req, res) => {
  const idFil = parseInt(req.params.idFil);
  try {
    const modules = await prisma.filiereModule.findMany({
      where: { idFil },
      include: { module: true } // Include module details
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

// Get all Filières for a Module (GET)
router.get('/module/:idMod', async (req, res) => {
  const idMod = parseInt(req.params.idMod);
  try {
    const filieres = await prisma.filiereModule.findMany({
      where: { idMod },
      include: { filiere: true } // Include filière details
    });
    res.json(filieres);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filières" });
  }
});

module.exports = router;