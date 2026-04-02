.PHONY: help install dev build test lint format clean docker-up docker-down deploy

help:
	@echo "BaaS Portal - Makefile Commands"
	@echo "================================"
	@echo ""
	@echo "Development:"
	@echo "  make install          - Instalar dependências"
	@echo "  make dev              - Iniciar desenvolvimento local"
	@echo "  make test             - Executar testes"
	@echo "  make test-coverage    - Testes com cobertura"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint             - Executar linter"
	@echo "  make format           - Formatar código"
	@echo "  make typecheck        - Type checking"
	@echo "  make security-check   - Verificar segurança"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build     - Build imagens"
	@echo "  make docker-up        - Iniciar containers"
	@echo "  make docker-down      - Parar containers"
	@echo "  make docker-logs      - Ver logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean            - Limpar arquivos temporários"
	@echo "  make setup            - Setup inicial"

install:
	@echo "📦 Instalando dependências..."
	cd frontend && npm install
	cd ../backend && npm install

dev:
	@echo "🚀 Iniciando desenvolvimento..."
	docker-compose up -d
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:3000"

test:
	@echo "🧪 Executando testes..."
	cd frontend && npm test
	cd ../backend && npm test

test-coverage:
	@echo "📊 Testes com cobertura..."
	cd frontend && npm run test:coverage
	cd ../backend && npm run test:coverage

lint:
	@echo "🔍 Linting..."
	cd frontend && npm run lint
	cd ../backend && npm run lint

format:
	@echo "✨ Formatando código..."
	cd frontend && npm run format
	cd ../backend && npm run format

typecheck:
	@echo "🔎 Type checking..."
	cd frontend && npm run typecheck
	cd ../backend && npm run typecheck

security-check:
	@echo "🔐 Verificando segurança..."
	npm audit --production
	npm run security:scan

docker-build:
	@echo "🏗️  Build Docker images..."
	docker-compose build

docker-up:
	@echo "⬆️  Iniciando containers..."
	docker-compose up -d
	@sleep 30
	docker-compose ps

docker-down:
	@echo "⬇️  Parando containers..."
	docker-compose down

docker-logs:
	@echo "📋 Logs..."
	docker-compose logs -f

docker-rebuild:
	@echo "🔄 Rebuild e restart..."
	docker-compose down
	docker-compose build
	docker-compose up -d

clean:
	@echo "🧹 Limpando..."
	cd frontend && rm -rf node_modules dist .Next
	cd ../backend && rm -rf node_modules dist coverage
	find . -name "*.log" -delete
	find . -name ".DS_Store" -delete

setup:
	@echo "⚙️  Setup inicial..."
	chmod +x setup.sh
	./setup.sh

monitor:
	@echo "📊 Abrindo monitoring..."
	@echo "Prometheus: http://localhost:9090"
	@echo "Grafana: http://localhost:3001"

migrate-db:
	@echo "🗄️  Migration do banco..."
	cd backend && npm run db:migrate

deploy-staging:
	@echo "🚀 Deploy para staging..."
	git push origin develop

deploy-prod:
	@echo "🚀 Deploy para produção..."
	git push origin release/$(VERSION)

backup:
	@echo "💾 Backup do banco..."
	docker exec baas-portal-db pg_dump -U baas_user baas_portal > backup-$(shell date +%Y%m%d-%H%M%S).sql

restore-backup:
	@echo "📥 Restaurando backup..."
	docker exec -i baas-portal-db psql -U baas_user baas_portal < $(BACKUP_FILE)
