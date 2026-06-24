import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('API Error:', err);

  const status = err.status || 500;
  const payload = {
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Erro interno do servidor',
      details: err.details || null
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };

  res.status(status).json(payload);
};
