import { Router } from "express";
import {
  getAllMascotas,
  getMascotaById,
  createMascota,
  putMascota,
  deleteMascota,
} from "../controllers/mascota.controllers";

import { validate } from "../middlewares/validateSchema";
import { createMascotaSchema, updateMascotaSchema } from "../schemas/mascota.schema";

const router: Router = Router();

router.get("/", getAllMascotas);
router.get("/:id", getMascotaById);
router.post("/", validate(createMascotaSchema), createMascota);
router.put("/:id", validate(updateMascotaSchema), putMascota);
router.delete("/:id", deleteMascota);

export default router;
