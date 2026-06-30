import { Router } from 'express';
import { PixController } from '../controllers/PixController';

const router = Router();
const controller = new PixController();

router.post('/keys', controller.createKey.bind(controller));
router.get('/keys', controller.listKeys.bind(controller));

export default router;
