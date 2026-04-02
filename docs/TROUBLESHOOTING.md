# Troubleshooting Guide

## Problemas Comuns

### 1. Erro: "Cannot find module 'react'"

**Causa**: Dependências não instaladas

**Solução**:
```bash
cd frontend
npm install
npm ci

# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

### 2. Erro: "Connection refused: localhost:5432"

**Causa**: PostgreSQL não está rodando

**Solução**:
```bash
# Verifique se o container está rodando
docker-compose ps postgres

# Reinicie o PostgreSQL
docker-compose restart postgres

# Ou start a partir do docker-compose.dev.yml
docker-compose -f docker-compose.dev.yml up -d postgres
```

### 3. Erro: "Keycloak not responding"

**Causa**: Keycloak demora para inicializar

**Solução**:
```bash
# Visualize logs
docker-compose logs keycloak

# Aguarde mais tempo e tente novamente
sleep 60

# Verifique o status
curl http://localhost:8080/health/ready

# Force restart
docker-compose down
docker-compose up -d
```

### 4. Erro: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"

**Causa**: Certificado SSL inválido/não gerado

**Solução**:
```bash
# Gere certificados auto-assinados
mkdir -p certs
cd certs

# OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Ou use mkcert
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1
```

### 5. Erro: "CORS error"

**Causa**: Configuração de CORS incorreta ou mismatch de URLs

**Solução**:
```bash
# Frontend .env.local
VITE_API_URL=http://localhost:3000

# Backend .env.local
CORS_ORIGIN=http://localhost:5173

# Ou para production
CORS_ORIGIN=https://app.baas-portal-dos-bancos.com.br
```

### 6. Erro: "Cannot read property 'x' of undefined"

**Causa**: Componente recebendo undefined

**Solução**:
```typescript
// ✅ BOM: Verificar antes de usar
const handleClick = useCallback((user?: User) => {
  if (!user) return
  console.log(user.name)
}, [])

// ✅ Optional chaining
console.log(user?.name)

// ✅ Nullish coalescing
const name = user?.name ?? 'Unknown'
```

### 7. Erro: "port already in use"

**Causa**: Porta já está ocupada

**Solução**:
```bash
# Encontre o processo usando a porta
lsof -i :3000

# Ou (Windows)
netstat -ano | findstr :3000

# Mate o processo
kill -9 <PID>

# Ou use outra porta
PORT=3001 npm run dev
```

### 8. Database Connection Error

**Causa**: Credenciais incorretas ou DB não acessível

**Solução**:
```bash
# Teste a conexão
psql postgresql://user:password@localhost:5432/baas_portal

# Ou com docker
docker exec baas-portal-db psql -U baas_user -d baas_portal -c "SELECT 1"

# Verifique as credenciais em .env.local
cat backend/.env.local | grep DATABASE_URL
```

### 9. Memory Leak Warning

**Causa**: Listener ou subscription não sendo limpo

**Solução**:
```typescript
// ✅ BOM: Limpar resources
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [])

// ✅ BOM: Remover event listeners
window.addEventListener('resize', handleResize)
return () => window.removeEventListener('resize', handleResize)
```

### 10. TypeScript "implicitly any" Error

**Causa**: Tipo não declarado

**Solução**:
```typescript
// ❌ RUIM
const data = await fetchData()

// ✅ BOM
interface User {
  id: string
  name: string
}

const user: User = await fetchData()
```

---

## Performance Issues

### Lento ao Iniciar

```bash
# Optimize webpack cache
rm -rf node_modules/.cache

# Rebuild
npm run build

# Analyze bundle size
npm run analyze
```

### Aplicação Travando

```bash
# Profiling com DevTools Browser
# 1. Abra DevTools (F12)
# 2. Vá para Performance
# 3. Click Record
# 4. Reproduza a ação lenta
# 5. Click Stop
# 6. Analise o timeline

# Para Node.js
node --prof app.js
node --prof-process isolate-*.log > processed.txt
```

---

## Debugging

### Frontend Debugging

```bash
# DevTools do navegador (F12)
# Console, Network, Performance tabs

# Debugar com Node
node --inspect app.js
# Abra chrome://inspect
```

### Backend Debugging

```bash
# Adicione console.log temporários
console.log('Debug:', variable)

# Use debugger statement
debugger

# Logging estruturado
logger.info('User created', { userId, email })
logger.error('Database error', { error: e.message })
```

### Database Debugging

```bash
# pgAdmin: http://localhost:5050

# Command line
psql -h localhost -U baas_user -d baas_portal
\dt -- List tables
\d users -- Describe table
SELECT * FROM users LIMIT 10;
```

---

## Logs

### Ver Logs dos Containers

```bash
# Todos os serviços
docker-compose logs

# Serviço específico
docker-compose logs backend

# Seguir logs em tempo real
docker-compose logs -f

# Últimas 100 linhas
docker-compose logs --tail 100

# Do timestamp específico
docker-compose logs --since 2026-04-02T10:00:00
```

### Arquivo de Logs

```bash
# Salvar logs em arquivo
docker-compose logs > logs.txt

# Com grep para filtrar
docker-compose logs | grep ERROR
docker-compose logs | grep "User created"
```

---

## Reset/Cleanup

### Limpar Tudo

```bash
# Remove containers
docker-compose down

# Remove volumes (cuidado!)
docker-compose down -v

# Remove tudo
docker-compose down --remove-orphans

# Re-criar do zero
make clean
make setup
```

### Reset Database

```bash
# Backup antes
docker exec baas-portal-db pg_dump -U baas_user -d baas_portal > backup.sql

# Reset
docker exec baas-portal-db dropdb -U baas_user baas_portal
docker exec baas-portal-db createdb -U baas_user baas_portal

# Restore schema
docker exec -i baas-portal-db psql -U baas_user -d baas_portal < scripts/init-db.sql
```

---

## Contatos e Suporte

- 📧 Email: support@baas-portal-dos-bancos.com
- 💬 Issues: https://github.com/labtec-agent-ia/baas-portal-dos-bancos/issues
- 📖 Documentação: https://github.com/labtec-agent-ia/baas-portal-dos-bancos/docs

---

**Última Atualização**: 2026-04-02  
**Versão**: 1.0.0
