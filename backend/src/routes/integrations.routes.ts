import { Router } from 'express';
import { IntegrationController } from '../controllers/IntegrationController';

const router = Router();
const integrationController = new IntegrationController();

router.post('/railz/connect', integrationController.connectRailz);
router.get('/railz/score', integrationController.getScore);

export default router;
