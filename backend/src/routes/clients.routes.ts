import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

const router = Router();
const controller = new ClientController();

router.post('/', controller.createClient.bind(controller));
/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Lista todos os clientes do BaaS
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Array de clientes retornados com sucesso
 */
router.get('/', controller.listClients.bind(controller));
router.get('/me', controller.getMe.bind(controller));
router.get('/:id', controller.getClient.bind(controller));

export default router;
