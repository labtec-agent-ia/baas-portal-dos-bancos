# BaaS Portal - Frontend (React + Vite)

Este diretório contém o scaffold do frontend em React + Vite + TypeScript.

## Requisitos
- Node.js 18+
- npm (ou pnpm/yarn)

## Desenvolvimento
1. Instalar dependências:
   ```
   npm ci
   ```
2. Rodar em modo dev:
   ```
   npm run dev
   ```
   A aplicação será servida em `http://localhost:5173`.

## Build e execução com Docker
1. Build da imagem:
   ```
   docker build -t baas-portal-frontend:latest .
   ```
2. Rodar a imagem:
   ```
   docker run -p 8080:80 baas-portal-frontend:latest
   ```

## Variáveis de ambiente
Copie `.env.example` para `.env` (se precisar). As variáveis expostas:
- `VITE_API_URL` - endpoint do backend (ex.: http://localhost:8080)
- `VITE_KEYCLOAK_URL` - URL do Keycloak
- `VITE_KEYCLOAK_REALM`
- `VITE_KEYCLOAK_CLIENT`

## Integração com Keycloak
Este scaffold inclui uma página de login de exemplo que aponta para o endpoint OIDC. Para integração completa, substitua a lógica do Login por um client Keycloak real (ex.: use keycloak-js ou uma lib React OIDC).

## CI
Existe um workflow exemplo `.github/workflows/frontend-ci.yml` que faz build da aplicação.