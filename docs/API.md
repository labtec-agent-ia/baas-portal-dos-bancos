# Segurança de API

## Endpoints de Autenticação

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "secure_password"
}

Response: 200 OK
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "roles": ["USER"]
  }
}
```

### Refresh Token

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGc..."
}
```

## Endpoints de PIX

### Registrar Chave PIX

```bash
POST /api/pix/keys
Authorization: Bearer {token}
Content-Type: application/json

{
  "key_type": "email|phone|cpf|random",
  "key_value": "user@example.com",
  "description": "Chave principal"
}

Response: 201 Created
{
  "id": "uuid",
  "owner_id": "uuid",
  "key_type": "email",
  "key_value": "user@example.com",
  "status": "active",
  "created_at": "2026-04-02T10:00:00Z"
}
```

### Listar Chaves PIX

```bash
GET /api/pix/keys
Authorization: Bearer {token}
```

### Buscar no DICT

```bash
GET /api/pix/dict/lookup?key=user@example.com
Authorization: Bearer {token}
```

## Endpoints de Clientes

### Criar Cliente

```bash
POST /api/clients
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva",
  "cpf": "123.456.789-00",
  "email": "joao@example.com",
  "phone": "(11) 99999-9999"
}
```

### Listar Clientes

```bash
GET /api/clients?limit=10&offset=0
Authorization: Bearer {token}
```

### Obter Cliente

```bash
GET /api/clients/{clientId}
Authorization: Bearer {token}
```

## Tratamento de Erros

### Padrão de Erro

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Descrição do erro",
    "details": {
      "field": "campo",
      "issue": "problema"
    }
  },
  "timestamp": "2026-04-02T10:00:00Z",
  "path": "/api/endpoint"
}
```

### Códigos de Erro

| Código | Status | Descrição |
|--------|--------|-----------|
| UNAUTHORIZED | 401 | Token inválido ou expirado |
| FORBIDDEN | 403 | Permissão insuficiente |
| NOT_FOUND | 404 | Recurso não encontrado |
| VALIDATION_ERROR | 400 | Dados inválidos |
| CONFLICT | 409 | Recurso já existe |
| RATE_LIMITED | 429 | Limite de requisições atingido |
| INTERNAL_ERROR | 500 | Erro interno do servidor |

## Rate Limiting

Limite de requisições por IP:

- **Normal**: 100 requisições/minuto
- **Auth**: 10 requisições/minuto
- **PIX**: 50 requisições/minuto

Header de resposta:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1649918400
```

## CORS

Origens permitidas (configurável):

```
http://localhost:5173  (develo)
https://app.baas-portal-dos-bancos.com.br  (prod)
```

## Headers de Segurança

Todos os endpoints retornam:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## Documentação Completa

Acesse: <http://localhost:3000/api/docs>
