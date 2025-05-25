const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all modules
router.get('/', async (req, res) => {
  try {
    const modules = await prisma.module.findMany();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

// POST a new module
router.post('/', async (req, res) => {
  const { nom, coeff } = req.body;
  try {
    const newModule = await prisma.module.create({
      data: { nom, coeff }
    });
    res.json(newModule);
  } catch (error) {
    res.status(400).json({ error: "Failed to create module" });
  }
});

// UPDATE a module
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nom, coeff } = req.body;
  try {
    const updatedModule = await prisma.module.update({
      where: { idMod: id },
      data: { nom, coeff }
    });
    res.json(updatedModule);
  } catch (error) {
    res.status(400).json({ error: "Failed to update module" });
  }
});

// DELETE a module
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.module.delete({
      where: { idMod: id }
    });
    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete module" });
  }
});

module.exports = router;