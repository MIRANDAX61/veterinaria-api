
import { Router } from "express";
import {
  getRecetas,
  createReceta,
} from "../controllers/receta.controller";

const router : Router = Router();

router.get("/", getRecetas);
router.post("/", createReceta);

export default router;
