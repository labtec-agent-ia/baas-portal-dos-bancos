# Quick Reference - Comandos Essenciais

## 🚀 Iniciar Desenvolvimento

```bash
# Setup inicial (primeira vez)
chmod +x setup.sh
./setup.sh

# Ou manualmente
docker-compose up -d
make install
make dev
```

## 📦 Instalação & Build

```bash
# Instalar dependências
make install
npm install  # em ambos frontend/ e backend/

# Build para produção
make build
npm run build

# Docker build
make docker-build
docker build -f frontend/Dockerfile -t baas-portal-frontend .
docker build -f backend/Dockerfile -t baas-portal-backend .
```

## 🧪 Testes

```bash
# Rodar todos os testes
make test

# Frontend
cd frontend && npm test

# Backend
cd backend && npm test

# Com cobertura
make test-coverage
npm run test:coverage
```

## 🔐 Segurança

```bash
# Análise de segurança
make security-check

# ESLint
make lint
npm run lint

# Type checking
make typecheck
npm run typecheck

# Audit de dependências
npm audit
npm audit fix

# SAST (SonarQube)
npm run security:scan
```

## 📁 Docker Compose

```bash
# Iniciar serviços
make docker-up
docker-compose up -d

# Parar serviços
make docker-down
docker-compose down

# Ver logs
make docker-logs
docker-compose logs -f

# Ver status
docker-compose ps

# Rebuild
make docker-rebuild
docker-compose down && docker-compose build && docker-compose up -d
```

## 🖥️ Desenvolvimento Local

```bash
# Frontend (porta 5173)
cd frontend && npm run dev

# Backend (porta 3000)
cd backend && npm run dev

# Ambos simultaneamente (2 terminais)
npm run dev &
```

## 📊 Monitoramento

```bash
# Abrir dashboards
make monitor

# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin:admin)
# Keycloak: http://localhost:8080 (admin:admin123)
# PgAdmin: http://localhost:5050 (dev@example.com:admin)
```

## 🗄️ Database

```bash
# Entrar no psql
docker exec -it baas-portal-db psql -U baas_user -d baas_portal

# Backup
docker exec baas-portal-db pg_dump -U baas_user -d baas_portal > backup.sql

# Restore
docker exec -i baas-portal-db psql -U baas_user -d baas_portal < backup.sql

# Migrar
make migrate-db
cd backend && npm run db:migrate
```

## 📝 Formatação & Cleanup

```bash
# Formatar código
make format
npm run format

# Limpar tudo
make clean
rm -rf node_modules dist coverage

# Remover containers
docker-compose down -v
```

## 📚 Documentação

```bash
# Ver documentação localmente
# Abrir em navegador: file://docs/

# Documentação específica
cat SECURITY.md         # Políticas de segurança
cat LGPD.md             # LGPD compliance
cat docs/API.md         # API documentation
cat docs/BEST_PRACTICES.md
cat docs/TROUBLESHOOTING.md
cat ROADMAP.md          # Roadmap do projeto
```

## 🔍 Debugging

```bash
# Health check
python3 scripts/health-check.py

# Logs em tempo real
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Verificar container
docker inspect baas-portal-api
docker stats

# Browser DevTools (F12)
# Chrome DevTools para frontend
# Command+Shift+C (Mac), Ctrl+Shift+C (Windows/Linux)
```

## 🚢 Deploy

```bash
# Pre-deployment checks
cat docs/DEPLOYMENT_CHECKLIST.md

# Deploy staging
make deploy-staging

# Deploy production
make deploy-prod VERSION=v1.0.0

# Rollback
docker-compose down
docker-compose -f docker-compose.prod.yml.bak up -d
```

## 🔧 Troubleshooting

```bash
# Erro comum: porta em uso
lsof -i :3000    # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill processo
kill -9 <PID>

# Reset total
make clean
docker-compose down -v
make setup

# Ver docs
cat docs/TROUBLESHOOTING.md
```

## 📖 Mais Informações

| Tópico | Arquivo |
|--------|---------|
| Guia Completo | [README.md](README.md) |
| Segurança | [SECURITY.md](SECURITY.md) |
| LGPD | [LGPD.md](LGPD.md) |
| Penteste | [docs/PENTESTING.md](docs/PENTESTING.md) |
| API | [docs/API.md](docs/API.md) |
| Deploy | [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md) |
| Problemas | [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) |
| Melhores Práticas | [docs/BEST_PRACTICES.md](docs/BEST_PRACTICES.md) |
| Roadmap | [ROADMAP.md](ROADMAP.md) |

---

## 💡 Dicas Rápidas

```bash
# Executar múltiplos comandos
make clean && make install && make dev

# Executar em background
docker-compose up -d &

# Ver variáveis de ambiente
cat frontend/.env.example
cat backend/.env.example

# Gerar JWT Secret
openssl rand -base64 32

# Gerar certificados
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

---

**Versão**: 2.0.0  
**Data**: 2026-04-02  
**Mais ajuda**: [GitHub Issues](https://github.com/labtec-agent-ia/baas-portal-dos-bancos/issues) | [Email](mailto:support@baas-portal-dos-bancos.com)
