#!/bin/bash
set -e

echo "🚀 BaaS Portal - Setup Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "\n${YELLOW}📋 Verificando pré-requisitos...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose${NC}"

# Create environment files
echo -e "\n${YELLOW}⚙️  Preparando arquivos de configuração...${NC}"

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo -e "${GREEN}✓ frontend/.env.local criado${NC}"
else
    echo -e "${YELLOW}⊘ frontend/.env.local já existe${NC}"
fi

if [ ! -f "backend/.env.local" ]; then
    cp backend/.env.example backend/.env.local
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" backend/.env.local
    
    echo -e "${GREEN}✓ backend/.env.local criado com JWT_SECRET${NC}"
else
    echo -e "${YELLOW}⊘ backend/.env.local já existe${NC}"
fi

# Build Docker images
echo -e "\n${YELLOW}🏗️  Construindo imagens Docker...${NC}"
docker-compose build --parallel

echo -e "\n${GREEN}✓ Imagens construídas com sucesso${NC}"

# Start services
echo -e "\n${YELLOW}🚀 Iniciando serviços...${NC}"
docker-compose up -d

echo -e "\n${YELLOW}⏳ Aguardando serviços iniciarem (30s)...${NC}"
sleep 30

# Health checks
echo -e "\n${YELLOW}🔍 Verificando saúde dos serviços...${NC}"

SERVICES=("postgres" "redis" "keycloak" "backend" "frontend")
ALL_HEALTHY=true

for service in "${SERVICES[@]}"; do
    if docker-compose ps $service | grep -q "healthy\|Up"; then
        echo -e "${GREEN}✓ $service${NC}"
    else
        echo -e "${RED}✗ $service${NC}"
        ALL_HEALTHY=false
    fi
done

if [ "$ALL_HEALTHY" = true ]; then
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ Setup completado com sucesso!${NC}"
    echo -e "${GREEN}========================================${NC}"
    
    echo -e "\n${YELLOW}📍 URLs de Acesso:${NC}"
    echo -e "  Frontend: ${GREEN}https://localhost${NC}"
    echo -e "  Backend:  ${GREEN}http://localhost:3000${NC}"
    echo -e "  Keycloak: ${GREEN}http://localhost:8080${NC}"
    echo -e "  Grafana:  ${GREEN}http://localhost:3001${NC}"
    echo -e "  Prometheus: ${GREEN}http://localhost:9090${NC}"
    
    echo -e "\n${YELLOW}🔐 Credenciais Padrão:${NC}"
    echo -e "  Keycloak Admin: ${GREEN}admin / admin123${NC}"
    echo -e "  Grafana Admin:  ${GREEN}admin / admin${NC}"
    
    echo -e "\n${YELLOW}📚 Próximos Passos:${NC}"
    echo -e "  1. Configure Keycloak: http://localhost:8080"
    echo -e "  2. Crie um realm e cliente OAuth"
    echo -e "  3. Atualize .env.local com credenciais"
    echo -e "  4. Restart dos serviços:"
    echo -e "     docker-compose restart"
    
else
    echo -e "\n${RED}========================================${NC}"
    echo -e "${RED}✗ Alguns serviços falharam${NC}"
    echo -e "${RED}========================================${NC}"
    echo -e "\n${YELLOW}Verifique os logs:${NC}"
    echo -e "  docker-compose logs"
    exit 1
fi
