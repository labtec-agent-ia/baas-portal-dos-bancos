import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export class SettingsController {
  async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await db('settings').select('key', 'value');
      
      const formattedSettings = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);

      res.status(200).json(formattedSettings);
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settingsToUpdate = req.body; // e.g. { railz_client_id: "...", railz_secret: "..." }

      await db.transaction(async (trx) => {
        for (const [key, value] of Object.entries(settingsToUpdate)) {
          if (typeof value === 'string') {
            await trx('settings')
              .insert({ key, value, updated_at: new Date() })
              .onConflict('key')
              .merge({ value, updated_at: new Date() });
          }
        }
      });

      res.status(200).json({ message: 'Configurações atualizadas com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}
