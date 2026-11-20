import { Router } from "express";
import {
  getAllPropietarios,
  createPropietario,
} from "../controllers/propietario.controllers";

const router: Router = Router();

router.get("/", getAllPropietarios);
router.post("/", createPropietario);

export default router;