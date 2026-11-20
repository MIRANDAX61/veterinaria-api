
import { Router } from "express";

import {
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
} from "../controllers/medicamentos.controller";

import {
  validateCreateMedicamento,
  validateUpdateMedicamento,
} from "../middlewares/validate-medicamento";

const router: Router = Router();

router.get("/", getMedicamentos);
router.get("/:id", getMedicamentoById);
router.post("/", validateCreateMedicamento, createMedicamento);
router.put("/:id", validateUpdateMedicamento, updateMedicamento);
router.delete("/:id", deleteMedicamento);

export default router;
