# Pre-Deploy Checklist

## Security ✅

- [ ] Verificar todas as credenciais em `.env.local`
- [ ] JWT_SECRET foi rotacionado (não usar default)
- [ ] Database password é forte (>12 caracteres, mixed)
- [ ] SSL/TLS certificados válidos
- [ ] Certificados têm expiração monitore
- [ ] CORS está restritivo (apenas domínios necessários)
- [ ] Headers de segurança configurados
  - [ ] Strict-Transport-Security
  - [ ] X-Frame-Options
  - [ ] Content-Security-Policy
  - [ ] X-Content-Type-Options
- [ ] Rate limiting ativado
- [ ] SQL injection protegido (prepared statements)
- [ ] XSS protegido (DOMPurify/sanitização)
- [ ] CSRF tokens implementados

## Code Quality ✅

- [ ] Sem `console.log` no código
- [ ] Sem `debugger` statements
- [ ] Sem `any` types (TS)
- [ ] Sem código comentado/dead code
- [ ] Sem secrets hardcoded
- [ ] ESLint sem erros
- [ ] TypeScript sem erros
- [ ] Testes com coverage > 80%
- [ ] Testes passando em CI/CD

## Performance ✅

- [ ] Bundle size analisado
- [ ] Images otimizadas (WebP)
- [ ] CSS/JS minificado
- [ ] Caching estratégias implementadas
- [ ] Database indexado
- [ ] N+1 queries verificado
- [ ] Memory leaks testados
- [ ] Load testing realizado

## Infrastructure ✅

- [ ] Docker images construídas
- [ ] Docker images vulnerabilities scanned (Trivy)
- [ ] Database migrations testadas
- [ ] Backup/recovery testado
- [ ] Logs configurados e centralizados
- [ ] Monitoring/alertas configurados
- [ ] Health checks implementados
- [ ] Auto-scaling testado (se aplicável)

## LGPD Compliance ✅

- [ ] Política de Privacidade publicada
- [ ] Consentimento implementado
- [ ] Direitos do titular implementados
  - [ ] Acesso aos dados
  - [ ] Retificação
  - [ ] Exclusão
  - [ ] Portabilidade
- [ ] Criptografia end-to-end
- [ ] Dados sensíveis (CPF, tokens) criptografados
- [ ] Audit logging configurado
- [ ] Data retention policies implementadas
- [ ] RIPA (Relatório de Impacto à Privacidade) completado
- [ ] Contato DPO disponível

## Testing ✅

- [ ] Unit tests passando
- [ ] Integration tests passando
- [ ] E2E tests (critical flows) passando
- [ ] Security tests passando
  - [ ] SAST (SonarQube)
  - [ ] DAST (OWASP ZAP)
  - [ ] Dependency check (npm audit)
  - [ ] Container scan (Trivy)

## Documentation ✅

- [ ] README.md atualizado
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Architecture diagram
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Contributing guide
- [ ] Security policy (SECURITY.md)
- [ ] LGPD policy (LGPD.md)
- [ ] Changelog atualizado

## Team & Process ✅

- [ ] Code review aprovado (2 pessoas)
- [ ] Security review aprovado
- [ ] Product owner aprovou
- [ ] Stakeholders notificados
- [ ] Runbook preparado
- [ ] Equipe treinada
- [ ] Rollback plan disponível
- [ ] On-call rotation configurado

## Monitoring & Observability ✅

- [ ] Prometheus configurado
- [ ] Grafana dashboards criados
- [ ] Alerts configurados
- [ ] Error tracking (Sentry) configurado
- [ ] APM (Application Performance Monitoring) active
- [ ] Log aggregation configurado
- [ ] Distributed tracing setup
- [ ] SLA/SLO definidos

## Backup & Disaster Recovery ✅

- [ ] Backup plan documentado
- [ ] Backup automatizado configurado
- [ ] Backup encryption verificado
- [ ] Backup retention policy definido
- [ ] Disaster recovery plan testado
- [ ] RTO/RPO definidos e atingíveis
- [ ] Recovery scripts testados

## Compliance & Legal ✅

- [ ] Termos de Serviço atualizado
- [ ] Política de Privacidade publicada
- [ ] Contato legal/compliance configurado
- [ ] Incident response plan preparado
- [ ] Conformidade regulatória verificada
- [ ] Terceiros (data processors) SLAs assinados
- [ ] Insurance requirements atendidos

## Post-Deploy ✅

- [ ] Todos os serviços respondendo (`make monitor`)
- [ ] Health checks green
- [ ] Logs sem erros críticos
- [ ] Alertas funcionando
- [ ] Tráfego normal esperado
- [ ] Performance dentro de SLA
- [ ] Usuários reportando tudo OK
- [ ] Post-incident review agendado (72h)

---

## Deployment Procedure

### 1. Pre-deployment

```bash
# Rodar checklist
make security-check
make test

# Build production images
docker build -f frontend/Dockerfile -t baas-portal-frontend:v1.0.0 .
docker build -f backend/Dockerfile -t baas-portal-backend:v1.0.0 .

# Push para registry
docker tag baas-portal-frontend:v1.0.0 registry/baas-portal-frontend:v1.0.0
docker push registry/baas-portal-frontend:v1.0.0
```

### 2. Deployment

```bash
# Blue-green deployment (sem downtime)
# Deploy no "blue" environment
docker-compose -f docker-compose.prod.yml up -d

# Testes no blue
make test-integration

# Switch traffic blue -> green
nginx_config switch_blue_to_green

# Monitor
make monitor
```

### 3. Rollback

```bash
# Se problemas
docker-compose down
docker-compose -f docker-compose.prod.yml.bak up -d

# Ou via Kubernetes
kubectl rollout undo deployment/baas-portal-api
```

### 4. Post-deployment

- [ ] Comunicar status no Slack
- [ ] Monitorar logs por 24h
- [ ] Coletar feedback dos usuários
- [ ] Documentar lições aprendidas

---

## Emergency Contacts

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Incident Commander | - | - | - |
| On-Call Engineer | - | - | - |
| Engineering Lead | - | - | - |
| Product Owner | - | - | - |
| Legal/Compliance | - | - | - |

---

**Data**: ___________  
**Deployment By**: ___________  
**Approved By**: ___________  

**Versão**: 1.0.0  
**Última Atualização**: 2026-04-02
