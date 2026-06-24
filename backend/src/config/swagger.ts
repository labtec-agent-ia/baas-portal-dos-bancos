import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BaaS Portal API - Modo Desenvolvedor',
      version: '1.0.0',
      description: 'Documentação interativa e painel de testes das APIs do BaaS Portal dos Bancos.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Desenvolvimento Local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);
