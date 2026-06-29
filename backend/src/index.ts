import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import pixRoutes from './routes/pix.routes';
import clientsRoutes from './routes/clients.routes';
import transactionsRoutes from './routes/transactions.routes';
import settingsRoutes from './routes/settings.routes';
import integrationsRoutes from './routes/integrations.routes';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Muitas requisições originadas deste IP, por favor tente novamente após 15 minutos.' }
});

// Apply global rate limiter to all requests
app.use(globalLimiter);

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://app.baas-portal-dos-bancos.com.br']
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'BaaS API rodando com sucesso. O Frontend visual está na porta 5173.' });
});

// Painel do Desenvolvedor (Swagger API Docs)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas Livres (Public)
// (Vazio por enquanto)

// Rotas Protegidas (Requer JWT)
app.use('/api/clients', authMiddleware, clientsRoutes);
app.use('/api/pix', authMiddleware, pixRoutes);
app.use('/api/transactions', authMiddleware, transactionsRoutes);
app.use('/api/settings', authMiddleware, settingsRoutes);
app.use('/api/integrations', authMiddleware, integrationsRoutes);

// Middleware Global de Erros
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Backend API rodando em http://localhost:${port}`);
});
