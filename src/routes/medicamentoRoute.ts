
import { Router } from "express";
import {
  getMedicamentos,
  createMedicamento,
} from "../controllers/medicamentos.controller";

const router : Router = Router();

router.get("/", getMedicamentos);
router.post("/", createMedicamento);

export default router;
