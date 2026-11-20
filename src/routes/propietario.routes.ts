import { Router } from "express";
import {
  getAllPropietarios,
  getPropietarioById,
  createPropietario,
  putPropietario,
  deletePropietario,
} from "../controllers/propietario.controllers";

import { validate } from "../middlewares/validateSchema";
import { createPropietarioSchema, updatePropietarioSchema } from "../schemas/propietario.schema";

const router: Router = Router();

router.get("/", getAllPropietarios);
router.get("/:id", getPropietarioById);
router.post("/", validate(createPropietarioSchema), createPropietario);
router.put("/:id", validate(updatePropietarioSchema), putPropietario);
router.delete("/:id", deletePropietario);

export default router;
