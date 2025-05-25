-- CreateTable
CREATE TABLE "Etudiant" (
    "idEtud" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT NOT NULL,
    "adresse" TEXT,
    "idFil" INTEGER NOT NULL,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("idEtud")
);

-- CreateTable
CREATE TABLE "Filiere" (
    "idFil" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Filiere_pkey" PRIMARY KEY ("idFil")
);

-- CreateTable
CREATE TABLE "Module" (
    "idMod" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "coeff" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("idMod")
);

-- CreateTable
CREATE TABLE "FiliereModule" (
    "idFil" INTEGER NOT NULL,
    "idMod" INTEGER NOT NULL,

    CONSTRAINT "FiliereModule_pkey" PRIMARY KEY ("idFil","idMod")
);

-- CreateTable
CREATE TABLE "Note" (
    "idEtud" INTEGER NOT NULL,
    "idMod" INTEGER NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("idEtud","idMod")
);

-- CreateIndex
CREATE UNIQUE INDEX "Etudiant_email_key" ON "Etudiant"("email");

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_idFil_fkey" FOREIGN KEY ("idFil") REFERENCES "Filiere"("idFil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiliereModule" ADD CONSTRAINT "FiliereModule_idFil_fkey" FOREIGN KEY ("idFil") REFERENCES "Filiere"("idFil") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FiliereModule" ADD CONSTRAINT "FiliereModule_idMod_fkey" FOREIGN KEY ("idMod") REFERENCES "Module"("idMod") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_idEtud_fkey" FOREIGN KEY ("idEtud") REFERENCES "Etudiant"("idEtud") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_idMod_fkey" FOREIGN KEY ("idMod") REFERENCES "Module"("idMod") ON DELETE RESTRICT ON UPDATE CASCADE;
