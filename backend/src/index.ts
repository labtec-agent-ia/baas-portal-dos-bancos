import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pixRoutes from './routes/pix.routes';
import clientsRoutes from './routes/clients.routes';
import transactionsRoutes from './routes/transactions.routes';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://app.baas-portal-dos-bancos.com.br']
}));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'BaaS API rodando com sucesso. O Frontend visual está na porta 5173.' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Painel do Desenvolvedor (Swagger API Docs)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas Livres (Public)
// (Vazio por enquanto)

// Rotas Protegidas (Requer JWT)
app.use('/api/clients', authMiddleware, clientsRoutes);
app.use('/api/pix', authMiddleware, pixRoutes);
app.use('/api/transactions', authMiddleware, transactionsRoutes);

// Middleware Global de Erros
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Backend API rodando em http://localhost:${port}`);
});
