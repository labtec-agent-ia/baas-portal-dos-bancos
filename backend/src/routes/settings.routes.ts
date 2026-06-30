import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';

const router = Router();
const settingsController = new SettingsController();

// Note: In a real app, we should add an admin auth middleware here to protect these endpoints
router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export default router;
