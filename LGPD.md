# Segurança LGPD e Privacidade

## 1. Política de Privacidade

Este projeto segue rigorosamente a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.

## 2. Princípios LGPD Implementados

### Finalidade
- Dados são coletados apenas para fins específicos, explícitos e legítimos
- Dados não podem ser reutilizados para fins incompatíveis
- Transparência total sobre o uso dos dados

### Necessidade
- Apenas dados essenciais são coletados
- Minimização de dados implementada em todas as camadas

### Consentimento
- Consentimento explícito do titular dos dados
- Comunicação clara sobre coleta de dados
- Opção de consentimento granular

## 3. Direitos do Titular de Dados

- ✅ Direito de acesso aos dados pessoais
- ✅ Direito de retificação de dados incorretos
- ✅ Direito de exclusão (direito ao esquecimento)
- ✅ Direito de portabilidade dos dados
- ✅ Direito de limitação de processamento
- ✅ Direito de oposição

## 4. Implementações Técnicas

### 4.1 Dados em Repouso
```
- Criptografia AES-256
- Database: PostgreSQL com TLS
- Backups criptografados
```

### 4.2 Dados em Trânsito
```
- HTTPS/TLS 1.2+
- Certificados SSL/TLS válidos
- Assinatura de APIs
```

### 4.3 Controle de Acesso
```
- Autenticação via Keycloak
- RBAC (Role-Based Access Control)
- Audit logs para ações críticas
- Sessões com timeout automático
```

### 4.4 Anonimização e Pseudonimização
```
- Dados sensíveis mascarados em logs
- CPF/CNPJ hasheados
- UUID para identificação interna
```

## 5. Tratamento de Dados Sensíveis

### CPF e CNPJ
```typescript
// Nunca armazenar em plain text
- Hash SHA-256 + Salt
- Índices apenas para lookup
```

### Tokens PIX
```typescript
// Criptografado com chave do usuário
- AES-256-GCM
- Rotação de chaves a cada 90 dias
```

### Senhas
```typescript
// Bcrypt com rounds configurável
- Mínimo 12 rounds
- Salt automático
```

## 6. Data Retention Policy

| Tipo de Dado | Período de Retenção | Método de Exclusão |
|---|---|---|
| Logs de Acesso | 12 meses | Exclusão automática |
| Transações PIX | 5 anos | Anonimização após 1 ano |
| Dados de Clientes | Ativo + 2 anos | Exclusão criptográfica |
| Backups | 12 meses | Destruição segura |

## 7. Relatório de Impacto à Privacidade (RIPA)

Documento obrigatório antes de novo processamento de dados:
- Necessidade e proporcionalidade
- Medidas de proteção implementadas
- Riscos identificados
- Consulta com DPO

## 8. Conformidade com LGPD

### Controles Implementados

#### Segurança
- [x] Autenticação multifator
- [x] Criptografia end-to-end
- [x] Audit logging
- [x] Monitoramento de segurança 24/7
- [x] Plano de resposta a incidentes

#### Governança
- [x] Política de Privacidade
- [x] Termo de Consentimento
- [x] Registro de Processamento
- [x] Designação de DPO (opcional)
- [x] Treinamento de equipe

#### Operações
- [x] Backup e recuperação de desastres
- [x] Teste de penetração anual
- [x] Análise de vulnerabilidades contínua
- [x] Segregação de dados
- [x] Monitoramento de acesso

## 9. Processo de Exclusão de Dados

```bash
# Solicitar exclusão via API
POST /api/gdpr/erasure-request
{
  "reason": "user_request",
  "user_id": "uuid"
}

# Verificação de 30 dias
# Exclusão segura com overwrite de 7 passes
# Relatório de conclusão via email
```

## 10. Fluxo de Comunicação sobre Dados

```
Coleta → Processamento → Armazenamento → Acesso → Retenção → Exclusão
  ↓           ↓              ↓             ↓         ↓           ↓
Consentimento Transparência Segurança Auditoria Políticas Comprovação
```

## 11. Incidentes de Segurança

Em caso de vazamento com dados pessoais:
1. Notificar ANPD em até 10 dias úteis
2. Comunicar titulares se houver risco
3. Documentar incidente e ações tomadas
4. Análise de causas raiz

## 12. Contato do DPO (Data Protection Officer)

📧 Email: privacy@baas-portal-dos-bancos.com
📞 Telefone: +55 (xx) xxxxx-xxxx
📧 ANPD: Autoridade Nacional de Proteção de Dados

## 13. Versão e Histórico

- v2.0 - 2026-04-02: Implementação completa LGPD
- v1.0 - 2026-01-01: Documento inicial
