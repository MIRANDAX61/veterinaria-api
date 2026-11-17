import { Router } from "express";
import { getVeterinarios, createVeterinario } from "../Controller/VeterinarioController";

const router: Router = Router();

router.get("/", getVeterinarios);
router.post("/", createVeterinario);

export default router;