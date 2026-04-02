# Guia de Contribuição

Obrigado por contribuir para o **BaaS Portal dos Bancos**! 🎉

## Como Contribuir

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/baas-portal-dos-bancos.git
cd baas-portal-dos-bancos
git remote add upstream https://github.com/labtec-agent-ia/baas-portal-dos-bancos.git
```

### 2. Criar Feature Branch

```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug
```

### 3. Desenvolvimento

```bash
# Instalar dependências
make install

# Iniciar desenvolvimento
make dev

# Rodar testes
make test

# Type checking
make typecheck

# Linting
make lint
```

### 4. Commit com Mensagens Claras

```bash
# Formato: tipo(escopo): descrição
git commit -m "feat(pix): adicionar suporte para chaves aleatórias"
git commit -m "fix(auth): corrigir expiração de token"
git commit -m "docs(lgpd): atualizar politica de privacidade"
```

**Tipos válidos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas

### 5. Push e Pull Request

```bash
git push origin feature/sua-feature
```

Abra um PR com:
- **Título descritivo**
- **Descrição do que foi feito**
- **Link para issue relacionada** (se houver)
- **Screenshot/vídeo** (se UI)
- **Checklist de verificação**

## Padrões de Código

### TypeScript/React

```typescript
// ✅ BOM
type UserProps = {
  id: string;
  name: string;
  onDelete?: (id: string) => void;
};

export const UserCard: React.FC<UserProps> = ({ id, name, onDelete }) => {
  const handleDelete = () => onDelete?.(id);
  
  return (
    <div>
      <h3>{name}</h3>
      <button onClick={handleDelete}>Remover</button>
    </div>
  );
};

// ❌ EVITAR
export function UserCard(props: any) {
  return <div>{props.name}</div>;
}
```

### Testes

```typescript
describe('UserCard', () => {
  it('deve renderizar nome do usuário', () => {
    render(<UserCard id="1" name="João" />);
    expect(screen.getByText('João')).toBeInTheDocument();
  });

  it('deve chamar onDelete ao clicar', () => {
    const onDelete = vi.fn();
    render(<UserCard id="1" name="João" onDelete={onDelete} />);
    
    fireEvent.click(screen.getByText('Remover'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

### Segurança

```typescript
// ✅ Seguro
const sanitizedInput = sanitize(userInput);
const token = validateToken(req.query.token);
const encrypted = encrypt(sensitiveData);

// ❌ Inseguro
const unsafeInput = req.body.data; // Sem validação
const token = req.query.token; // Sem tipo seguro
const plain = req.body.password; // Sem criptografia
```

## Processo de Review

1. **Testes**: Todos os testes devem passar
2. **Linting**: Sem erros de ESLint
3. **Type Safety**: TypeScript sem `any`
4. **Security**: Passou na análise de segurança
5. **Documentation**: Código documentado

## Checklist de PR

```markdown
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem console.log ou código comentado
- [ ] Sem `any` types
- [ ] Segue padrões de código
- [ ] Sem erros de linting
- [ ] Mudanças de banco de dados incluem migrations
```

## Relatando Issues

### Template de Bug

```markdown
## Descrição
[Descrever o bug claramente]

## Passos para Reproduzir
1. [Passo 1]
2. [Passo 2]
3. [...]

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Ambiente
- SO: [Windows/Linux/Mac]
- Navegador: [Chrome/Firefox/Safari]
- Versão do App: [v1.0.0]

## Screenshots
[Se aplicável]

## Logs
\`\`\`
[Erro/stacktrace]
\`\`\`
```

### Template de Feature Request

```markdown
## Descrição
[Descrever a nova feature]

## Contexto
[Por que precisa dessa feature?]

## Aceitação
- [ ] [Critério 1]
- [ ] [Critério 2]

## Exemplos
[Se aplicável]
```

## Dúvidas?

- 📖 Leia a [documentação](docs/)
- 💬 Abra uma [discussion](https://github.com/labtec-agent-ia/baas-portal-dos-bancos/discussions)
- 📧 Email: dev@baas-portal-dos-bancos.com

---

**Obrigado por contribuir! 💪**
