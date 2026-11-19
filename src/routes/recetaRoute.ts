
import { Router } from "express";

import {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
} from "../controllers/receta.controller";

const router: Router = Router();

router.get("/", getRecetas);
router.get("/:id", getRecetaById);
router.post("/", createReceta);
router.put("/:id", updateReceta);
router.delete("/:id", deleteReceta);

export default router;
