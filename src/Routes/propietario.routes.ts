import { Router } from 'express';
import { getAllPropietarios, createPropietario } from '../Controllers/propietario.controllers';


const router: Router = Router();

router.get('/', getAllPropietarios)
router.post('/', createPropietario)

export default router