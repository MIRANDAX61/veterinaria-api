/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `veterinarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "veterinarios_correo_key" ON "veterinarios"("correo");
