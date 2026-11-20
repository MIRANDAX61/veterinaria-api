
import { Router } from "express";

import {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
} from "../controllers/receta.controller";

import { validateCreateReceta, validateUpdateReceta } from "../middlewares/validate-receta";

const router: Router = Router();

router.get("/", getRecetas);
router.get("/:id", getRecetaById);
router.post("/", validateCreateReceta, createReceta);
router.put("/:id", validateUpdateReceta, updateReceta);
router.delete("/:id", deleteReceta);

export default router;
