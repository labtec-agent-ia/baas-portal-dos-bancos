# Política de Segurança

## Versão: 2.0
## Data: 2026-04-02

## 1. Suporte de Versões

| Versão | Status | Suporte até |
|--------|--------|------------|
| 2.x    | ✅ Ativo | 2027-04-02 |
| 1.x    | ⚠️ Crítico | 2026-07-02 |
| 0.x    | ❌ Fim de Suporte | - |

## 2. Relatando Vulnerabilidades

### Processo Responsável de Divulgação

**NÃO** abra issues públicas para vulnerabilidades de segurança.

### Como reportar:
1. **Email**: security@baas-portal-dos-bancos.com
2. **Inclua**:
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Versões afetadas

### Tempo de Resposta:
- ⏱️ Confirmação inicial: 24 horas
- ⏱️ Primeira atualização: 5 dias úteis
- ⏱️ Patch crítico: 14 dias

### Escala de Severidade

| Nível | Score | Tempo de Patch | Exemplo |
|-------|-------|----------------|---------|
| 🔴 Crítico | 9.0-10.0 | 7 dias | RCE, SQL Injection |
| 🟠 Alto | 7.0-8.9 | 14 dias | Autenticação fraca |
| 🟡 Médio | 4.0-6.9 | 30 dias | XSS, CSRF |
| 🟢 Baixo | 0.1-3.9 | 60 dias | Informações sensíveis |

## 3. Segurança em Desenvolvimento

### 3.1 Padrões de Código

```typescript
// ❌ Evitar
const password = "hardcoded123";
const token = req.query.token; // Sem validação

// ✅ Correto
const password = process.env.SECURE_PASSWORD;
const token = validateToken(req.query.token);
```

### 3.2 Dependências

- Verificação semanal de vulnerabilidades
- `npm audit` obrigatória antes de merge
- Renovação de dependências trimestralmente

### 3.3 Secrets Management

```yaml
# Usar AWS Secrets Manager, HashiCorp Vault, ou similar
- API_KEY: (managed)
- DATABASE_PASSWORD: (managed)
- JWT_SECRET: (rotated monthly)
```

## 4. Controles de Acesso

### 4.1 Autenticação

- ✅ Keycloak OAuth2 + OpenID Connect
- ✅ MFA obrigatório para admins
- ✅ Autenticação social (Google, GitHub)

### 4.2 Autorização

```typescript
// RBAC com níveis:
- ADMIN: Acesso total
- MANAGER: Gerenciar usuários
- USER: Operações próprias
- VIEWER: Apenas leitura
```

### 4.3 Sessões

- Timeout: 30 minutos de inatividade
- Logout automático
- Refresh tokens com rotação

## 5. Criptografia

### 5.1 Em Repouso
- Algoritmo: AES-256-GCM
- Chaves: HSM ou AWS KMS
- Rotação: Anual ou via evento

### 5.2 Em Trânsito
- Protocolo: TLS 1.2+
- Certificados: Let's Encrypt ou CA interno
- Verificação: Pinning para APIs críticas

### 5.3 Hashing
- Senhas: bcrypt (rounds=12)
- Dados: SHA-256 com salt

## 6. Auditoria e Logging

### 6.1 Eventos Registrados
```
- Acesso ao sistema
- Modificação de dados sensíveis
- Operações administrativas
- Erros de autenticação
- Mudanças de permissões
```

### 6.2 Retenção de Logs
- Compliance: 2 anos
- Arquivamento: IBM Cloud Storage
- Criptografia: AES-256

### 6.3 Monitoramento
- SIEM: Splunk/ELK Stack
- Alertas: > 5 tentativas de login falhadas
- Revisão: Diariamente

## 7. Teste de Segurança

### 7.1 Frequência

| Tipo | Frequência | Ferramenta |
|------|------------|-----------|
| SAST | Contínua | SonarQube |
| DAST | Semanal | OWASP ZAP |
| Penteste | Trimestral | Externo |
| Audit | Anual | Independente |

### 7.2 Execução
```bash
# Análise de código estática
npm run security:scan

# Testes de aplicação dinâmica
npm run owasp-zap

# Análise de dependências
npm audit
```

## 8. Resposta a Incidentes

### 8.1 Plano de Ação

1. **Detecção** (< 1 hora)
2. **Contenção** (< 4 horas)
3. **Erradicação** (< 24 horas)
4. **Recuperação** (< 72 horas)
5. **Análise** (< 2 semanas)

### 8.2 Contactos de Emergência

- 🚨 Coordenador de Segurança: security-lead@example.com
- 🚨 CTO: cto@example.com
- 🚨 Jurídico: legal@example.com

## 9. Conformidade

### 9.1 Padrões

- ✅ OWASP Top 10
- ✅ NIST Cybersecurity Framework
- ✅ LGPD (Lei 13.709/2018)
- ✅ ISO/IEC 27001
- ✅ SOC 2 Type II

### 9.2 Certificações

Auditoria anual conforme normas internacionais.

## 10. Educação e Treinamento

- 📚 Treinamento inicial: Obrigatório
- 📚 Reciclagem: Semestral
- 📚 Simulados de phishing: Trimestral

## 11. Infraestrutura Segura

### 11.1 Ambiente
- App Server: Containerizado (Docker)
- Database: PostgreSQL com TLS
- Cache: Redis com autenticação
- Proxy: Nginx com WAF

### 11.2 Rede
- VPC isolada
- Security Groups restritivos
- NACLs para camadas
- DDoS protection (CloudFlare)

## 12. Changelog de Segurança

Acesse [SECURITY_UPDATES.md](./docs/SECURITY_UPDATES.md)

---

**Última Atualização**: 2026-04-02  
**Próxima Revisão**: 2026-10-02
