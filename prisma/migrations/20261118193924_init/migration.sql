-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'HEMBRA');

-- CreateTable
CREATE TABLE "propietarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,

    CONSTRAINT "propietarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mascotas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "raza" TEXT NOT NULL,
    "obs_importantes" TEXT NOT NULL,

    CONSTRAINT "mascotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veterinarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,

    CONSTRAINT "veterinarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicamento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_vencimiento" DATE NOT NULL,
    "marca" TEXT NOT NULL,
    "lote" TEXT NOT NULL,

    CONSTRAINT "medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recetas" (
    "id" SERIAL NOT NULL,
    "mascota_id" INTEGER NOT NULL,

    CONSTRAINT "recetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receta_medicamento" (
    "id" SERIAL NOT NULL,
    "receta_id" INTEGER NOT NULL,
    "medicamento_id" INTEGER NOT NULL,
    "dosis" TEXT NOT NULL,
    "frecuencia" TEXT NOT NULL,
    "duracion" TEXT NOT NULL,

    CONSTRAINT "receta_medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial_visitas" (
    "id" SERIAL NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "veterinario_id" INTEGER NOT NULL,
    "receta_id" INTEGER,
    "motivo" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,

    CONSTRAINT "Historial_visitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "propietarios_correo_key" ON "propietarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "receta_medicamento_receta_id_medicamento_id_key" ON "receta_medicamento"("receta_id", "medicamento_id");

-- CreateIndex
CREATE UNIQUE INDEX "Historial_visitas_mascota_id_key" ON "Historial_visitas"("mascota_id");

-- AddForeignKey
ALTER TABLE "recetas" ADD CONSTRAINT "recetas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receta_medicamento" ADD CONSTRAINT "receta_medicamento_receta_id_fkey" FOREIGN KEY ("receta_id") REFERENCES "recetas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receta_medicamento" ADD CONSTRAINT "receta_medicamento_medicamento_id_fkey" FOREIGN KEY ("medicamento_id") REFERENCES "medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial_visitas" ADD CONSTRAINT "Historial_visitas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial_visitas" ADD CONSTRAINT "Historial_visitas_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "veterinarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial_visitas" ADD CONSTRAINT "Historial_visitas_receta_id_fkey" FOREIGN KEY ("receta_id") REFERENCES "recetas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
