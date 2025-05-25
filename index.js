const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(express.static('public')); // Serve static files

// Optional: Use a templating engine (e.g., EJS) for server-rendered pages
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes

const cors = require('cors');
app.use(cors());
const etudiantRoutes = require('./src/routes/etudiantRoutes');
const filiereRoutes = require('./src/routes/filiereRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const filiereModuleRoutes = require('./src/routes/filiereModuleRoutes');
const noteRoutes = require('./src/routes/noteRoutes');

app.use('/etudiants', etudiantRoutes);
app.use('/filieres', filiereRoutes);
app.use('/modules', moduleRoutes);
app.use('/filiere-modules', filiereModuleRoutes);
app.use('/notes', noteRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
