import { Router } from 'express';
import { getAllMascotas, createMascota } from '../Controllers/mascota.controllers';


const router: Router = Router();

router.get('/', getAllMascotas)
router.post('/', createMascota)

export default router