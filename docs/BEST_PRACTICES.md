# Boas Práticas de Desenvolvimento

## 1. Estrutura de Código

### Organização de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Common/         # Botões, inputs, etc
│   ├── Layout/         # Header, Footer, Sidebar
│   └── Features/       # Feature-específicos
├── pages/              # Views/páginas
├── hooks/              # Custom hooks
├── services/           # APIs e integração
├── utils/              # Funções utilitárias
├── constants/          # Constantes
├── types/              # TypeScript types
├── styles/             # Estilos globais
└── App.tsx
```

### Naming Conventions

```typescript
// Components (PascalCase)
export const UserProfile: React.FC<Props> = ({ user }) => { }

// Hooks (camelCase com uso de "use")
export const useUserData = () => { }

// Utils (camelCase)
export const formatCurrency = (value: number) => { }

// Constants (UPPER_CASE)
export const API_BASE_URL = 'http://localhost:3000'
export const DEFAULT_PAGE_SIZE = 10

// Files matching exports
// UserProfile.tsx
// useUserData.ts
// formatCurrency.ts
```

## 2. TypeScript

### Type Safety

```typescript
// ✅ BOM: Tipos explícitos
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer'
}

// ❌ RUIM: Any type
function getUser(id: any): any { }

// ✅ BOM: Genéricos quando apropriado
function getItem<T>(id: string): Promise<T> { }
```

### Return Types

```typescript
// ✅ Sempre declare return types
function calculateTotal(items: number[]): number {
  return items.reduce((a, b) => a + b, 0)
}

// ❌ Evite retornar implicitamente
function calculate(items: number[]) {
  return items.reduce((a, b) => a + b, 0)
}
```

## 3. React Best Practices

### Componentes Funcionais

```typescript
// ✅ Funcional com tipos
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// ❌ Evite componentes de classe
class Button extends React.Component { }
```

### Hooks

```typescript
// ✅ BOM: Effect com dependencies
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [dependencies])

// ❌ RUIM: Effect sem dependencies
useEffect(() => {
  subscribeToEverything()
})

// ✅ Custom hook reutilizável
function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    // fetch logic
  }, [userId])
  
  return { user, loading }
}
```

## 4. Performance

### React Optimization

```typescript
// ✅ Memoize expensive components
export const UserList = React.memo(({ users }: Props) => {
  return <div>{/* render */}</div>
})

// ✅ Use useCallback para callbacks
const handleDelete = useCallback((id: string) => {
  // delete logic
}, [])

// ✅ Use useMemo para computations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name))
}, [users])
```

### Bundle Size

```typescript
// ✅ Tree-shake friendly imports
import { debounce } from 'lodash-es'

// ❌ Evite importar tudo
import * as _ from 'lodash'

// Use dynamic imports para código não-crítico
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

## 5. Tratamento de Erros

### Try-Catch

```typescript
// ✅ BOM: Tratamento específico
try {
  await fetchUserData()
} catch (error) {
  if (error instanceof NetworkError) {
    handleNetworkError(error)
  } else if (error instanceof ValidationError) {
    handleValidationError(error)
  } else {
    handleGenericError(error)
  }
}

// ❌ RUIM: Catch genérico
try {
  await fetchUserData()
} catch (error) {
  console.log('Erro')
}
```

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo)
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }
    return this.props.children
  }
}
```

## 6. Segurança

### Input Validation

```typescript
// ✅ Validar entrada
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// ✅ Sanitizar output
const sanitizeHtml = (html: string) => {
  // Use DOMPurify or similar
  return DOMPurify.sanitize(html)
}

// ❌ Nunca confie em entrada do usuário
const userInput = req.body.email // ❌ Inseguro
```

### Autenticação

```typescript
// ✅ Guard rotas
function ProtectedRoute({ component: Component }: Props) {
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

// ✅ Validar tokens
async function validateToken(token: string): Promise<DecodedToken> {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new UnauthorizedError('Invalid token')
  }
}
```

## 7. Testes

### Unit Tests

```typescript
describe('formatCurrency', () => {
  it('deve formatar valor em reais', () => {
    expect(formatCurrency(1000)).toBe('R$ 1.000,00')
  })

  it('deve lidar com valores menores que 1', () => {
    expect(formatCurrency(0.5)).toBe('R$ 0,50')
  })

  it('deve retornar "R$ 0,00" para valores inválidos', () => {
    expect(formatCurrency(NaN)).toBe('R$ 0,00')
  })
})
```

### Integration Tests

```typescript
describe('UserAPI', () => {
  it('deve criar um usuário', async () => {
    const user = await api.post('/users', {
      name: 'João',
      email: 'joao@example.com'
    })

    expect(user.id).toBeDefined()
    expect(user.name).toBe('João')
  })
})
```

## 8. Documentação

### Comentários

```typescript
// ✅ Comentários úteis
/**
 * Calcula o desconto de um produto
 * @param price - Preço original
 * @param discount - Percentual de desconto (0-100)
 * @returns Preço após desconto
 */
function applyDiscount(price: number, discount: number): number {
  return price * (1 - discount / 100)
}

// ❌ Comentários óbvios
const x = 10 // set x to 10
```

### README de Componentes

```typescript
/**
 * Button Component
 *
 * Botão reutilizável com várias variantes
 *
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 */
```

## 9. Git Workflow

### Commits

```bash
# ✅ BOM: Commits atômicos e descritivos
git commit -m "feat(auth): adicionar autenticação OAuth"
git commit -m "fix(pix): corrigir validação de chaves"

# ❌ RUIM: Commits vagos
git commit -m "fix stuff"
git commit -m "update"
```

### Branches

```bash
# Feature
git checkout -b feature/pix-keys-management

# Bug fix
git checkout -b fix/login-timeout

# Release
git checkout -b release/v1.0.0
```

## 10. Code Review

### Checklist de Review

- [ ] Código segue padrões
- [ ] Testes inclusos e passando
- [ ] Type safety completa
- [ ] Sem console.log ou debugger
- [ ] Performance considerada
- [ ] Documentação atualizada
- [ ] Sem dependências desnecessárias

---

**Última Atualização**: 2026-04-02  
**Versão**: 1.0.0
