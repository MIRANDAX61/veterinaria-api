import { Router, type Router as ExpressRouter} from "express";
import { Veterinarios, VeterinariosId, createVeterinario, deleteVeterinarios, updateVeterinarios } from "../Controller/VeterinarioController";








const router: ExpressRouter = Router();
router.get("/", Veterinarios)
router.get("/:id", VeterinariosId)
router.post("/", createVeterinario)
router.put("/:id", updateVeterinarios)
router.delete("/:id", deleteVeterinarios)


export default router;