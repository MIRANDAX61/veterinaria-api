import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { validateBody, validateParams, validateQuery } from '../middleware/validate.middleware';
import type { IRouter } from 'express';
import controller from '../controllers/historialVisitasController';
import { crearVisitaSchema,
    obtenerTodos,
    visitaPorMascotaSchema,
 } from '../schemas/historialVisitasSchema';

const router: IRouter = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/visitas:
 *   post:
 *     summary: Crear una nueva visita
 *     tags: [Visitas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [petId, fecha, motivo, veterinario]
 *             properties:
 *               petId:
 *                 type: string
 *                 format: uuid
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               motivo:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 500
 *               sintomas:
 *                 type: string
 *                 maxLength: 1000
 *               diagnostico:
 *                 type: string
 *                 maxLength: 1000
 *               tratamiento:
 *                 type: string
 *                 maxLength: 1000
 *               costo:
 *                 type: number
 *               veterinario:
 *                 type: string
 *                 minLength: 1
 *               notas:
 *                 type: string
 *                 maxLength: 2000
 *               estado:
 *                 type: string
 *                 enum: [pendiente, completada, cancelada]
 *                 default: pendiente
 *     responses:
 *       201:
 *         description: Visita creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Visita"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Rol insuficiente
 */
router.post('/', authorize('admin', 'veterinario'), validateBody(crearVisitaSchema), controller.crear);
/**
 * @swagger
 * /api/visitas:
 *   get:
 *     summary: Obtener todas las visitas
 *     tags: [Visitas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de visitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Visita"
 *       401:
 *         description: No autenticado
 */
router.get('/', authorize('admin', 'veterinario'), validateQuery(obtenerTodos), controller.obtenerTodos);
/**
 * @swagger
 * /api/visitas/{petId}:
 *   get:
 *     summary: Obtener visitas de una mascota
 *     tags: [Visitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Lista de visitas de la mascota
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Visita"
 *       400:
 *         description: petId inválido
 *       401:
 *         description: No autenticado
 */
router.get('/mascota/:mascotaId', authorize('admin', 'veterinario'), validateParams(visitaPorMascotaSchema), controller.obtenerPorMascota);

router.post('/', controller.crear);
router.get('/', controller.obtenerTodos);
router.get('/mascota/:mascotaId', controller.obtenerPorMascota);

export default router;   