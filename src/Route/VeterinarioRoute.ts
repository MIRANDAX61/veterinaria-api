import { Router, type Router as ExpressRouter} from "express";
import { Veterinarios, VeterinariosId, createVeterinario, deleteVeterinarios, updateVeterinarios } from "../Controller/VeterinarioController";
import { authorize } from "../Middleware/authorizeMiddleware";
import { verifyToken } from "../Middleware/authMiddleware";


const router: ExpressRouter = Router();


router.get("/", verifyToken, authorize("RECEPCION"), Veterinarios)
router.get("/:id",verifyToken,authorize("RECEPCION","VETERINARIO"),VeterinariosId)
router.post("/", verifyToken, authorize("RECEPCION","VETERINARIO"),createVeterinario)
router.put("/:id", verifyToken, authorize("RECEPCION"),updateVeterinarios)
router.delete("/:id",verifyToken, authorize("RECEPCION"),deleteVeterinarios)


export default router;