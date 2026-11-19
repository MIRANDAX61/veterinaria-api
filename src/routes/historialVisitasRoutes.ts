import { Router } from 'express';
import type { IRouter } from 'express';
import controller from '../controllers/historialVisitasController';

const router: IRouter = Router();

router.post('/', controller.crear);
router.get('/', controller.obtenerTodos);
router.get('/mascota/:mascotaId', controller.obtenerPorMascota);

export default router;   