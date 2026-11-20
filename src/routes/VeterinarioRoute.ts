import { Router, type Router as ExpressRouter} from "express";
import { Veterinarios, VeterinariosId, createVeterinario, deleteVeterinarios, updateVeterinarios } from "../controllers/VeterinarioController";
import { validateVeterinario, validateVeterinarioUpdate } from "../middlewares/veterinario.middleware";







const router: ExpressRouter = Router();
router.get("/", Veterinarios)
router.get("/:id", VeterinariosId)
router.post("/", validateVeterinario, createVeterinario)
router.put("/:id", validateVeterinarioUpdate, updateVeterinarios)
router.delete("/:id", deleteVeterinarios)


export default router;