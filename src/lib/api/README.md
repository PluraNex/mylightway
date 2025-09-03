# API Architecture

Esta é a arquitetura profissional de API para o MyLightWay, construída com TypeScript, React Query e padrões modernos de desenvolvimento.

## 📁 Estrutura de Diretórios

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts        # Cliente HTTP principal
│   │   ├── config.ts        # Configurações do React Query
│   │   └── README.md        # Este arquivo
│   └── env.ts               # Configurações de ambiente
├── hooks/
│   └── api/                 # Hooks customizados para API
│       ├── useAuth.ts       # Hooks de autenticação
│       ├── useLearningPaths.ts
│       ├── useLessons.ts
│       ├── useProgress.ts
│       ├── useUsers.ts
│       ├── useAchievements.ts
│       ├── useBlog.ts
│       ├── useParents.ts
│       ├── useCategories.ts
│       └── index.ts
├── services/                # Camada de serviços
│   ├── authService.ts       # Serviços de autenticação
│   ├── learningService.ts   # Serviços de aprendizado
│   ├── userService.ts       # Serviços de usuário
│   └── index.ts
├── components/
│   └── api/                 # Componentes relacionados à API
│       ├── ApiErrorBoundary.tsx
│       ├── LoadingSpinner.tsx
│       ├── QueryProvider.tsx
│       ├── ApiStatus.tsx
│       └── index.ts
└── types/
    └── api.ts               # Tipos TypeScript para API
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true
```

### 2. Inicialização no App.tsx

```tsx
import { QueryProvider } from '@/components/api';
import { AuthService } from '@/services';

// Inicializar autenticação
AuthService.initializeAuth();

function App() {
  return <QueryProvider>{/* Seu app aqui */}</QueryProvider>;
}
```

## 🚀 Uso

### Hooks de API

```tsx
import { useAuth, useLearningPaths, useLesson } from '@/hooks/api';

function Dashboard() {
  const { data: profile, isLoading } = useProfile();
  const { data: paths } = useLearningPaths();
  const loginMutation = useLogin();

  const handleLogin = credentials => {
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        console.log('Login realizado com sucesso!');
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Olá, {profile?.name}</h1>
      {/* Conteúdo do dashboard */}
    </div>
  );
}
```

### Serviços Diretos

```tsx
import { AuthService, LearningService } from '@/services';

// Login
const response = await AuthService.login({ email, password });

// Buscar trilhas de aprendizado
const paths = await LearningService.getLearningPaths({
  category: 'bible-study',
  limit: 10,
});
```

### Error Handling

```tsx
import { ApiErrorBoundary } from '@/components/api';

function App() {
  return (
    <ApiErrorBoundary>
      <YourComponents />
    </ApiErrorBoundary>
  );
}
```

## 🔑 Principais Funcionalidades

### 1. Cliente HTTP (ApiClient)

- **Interceptadores automáticos**: Adiciona tokens de autenticação
- **Tratamento de erros**: Padronização de erros da API
- **Timeout configurável**: Via variáveis de ambiente
- **Retry automático**: Para falhas de rede

### 2. React Query Integration

- **Cache inteligente**: Dados ficam em cache por 5-10 minutos
- **Invalidação automática**: Cache é invalidado após mutations
- **Background refetch**: Atualiza dados em background
- **Query keys tipadas**: Chaves de query organizadas e tipadas

### 3. Hooks Customizados

- **useAuth**: Login, logout, perfil do usuário
- **useLearningPaths**: Trilhas de aprendizado
- **useLessons**: Lições e progresso
- **useProgress**: Acompanhamento de progresso
- **useUsers**: Gerenciamento de usuários

### 4. Tratamento de Estados

```tsx
const { data, isLoading, error, refetch } = useQuery({...});

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <DataComponent data={data} />;
```

### 5. Mutations com Otimistic Updates

```tsx
const updateProgress = useUpdateLessonProgress();

updateProgress.mutate(
  { lessonId, progress: 100 },
  {
    onSuccess: () => {
      toast.success('Progresso salvo!');
    },
    onError: error => {
      toast.error(`Erro: ${error.message}`);
    },
  }
);
```

## 📊 Query Keys

Todas as query keys são tipadas e organizadas:

```tsx
import { queryKeys } from '@/lib/api/config';

// Exemplos de uso
queryKeys.auth.profile(); // ['auth', 'profile']
queryKeys.learningPaths.detail('123'); // ['learning-paths', 'detail', '123']
queryKeys.lessons.progress('456', 'user1'); // ['lessons', '456', 'progress', 'user1']
```

## 🛡️ Tratamento de Erros

### Tipos de Erro

- **401 Unauthorized**: Redirecionamento para login
- **403 Forbidden**: Mensagem de permissão negada
- **404 Not Found**: Conteúdo não encontrado
- **5xx Server Error**: Erro do servidor
- **NETWORK_ERROR**: Problemas de conexão

### Error Boundaries

```tsx
<ApiErrorBoundary
  fallback={(error, resetError) => (
    <CustomErrorComponent error={error} onRetry={resetError} />
  )}
>
  <YourComponent />
</ApiErrorBoundary>
```

## 🔄 Infinite Queries

Para listas paginadas:

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteLearningPaths({ category: 'bible-study' });

// Renderizar páginas
data?.pages.map(page =>
  page.data.map(item => <Item key={item.id} {...item} />)
);
```

## 📈 Performance

### Cache Strategy

- **Stale Time**: 5 minutos para dados gerais
- **Garbage Collection**: 10 minutos
- **Background Refetch**: Apenas na reconexão
- **Query Deduplication**: Queries idênticas são deduplicated

### Optimistic Updates

```tsx
const updateMutation = useMutation({
  mutationFn: updateData,
  onMutate: async newData => {
    // Cancelar queries existentes
    await queryClient.cancelQueries({ queryKey });

    // Snapshot do valor anterior
    const previousData = queryClient.getQueryData(queryKey);

    // Atualização otimista
    queryClient.setQueryData(queryKey, newData);

    return { previousData };
  },
  onError: (error, variables, context) => {
    // Reverter em caso de erro
    if (context?.previousData) {
      queryClient.setQueryData(queryKey, context.previousData);
    }
  },
  onSettled: () => {
    // Revalidar após mutation
    queryClient.invalidateQueries({ queryKey });
  },
});
```

## 🧪 Testes

### Mocking APIs

```tsx
// Em testes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderWithProviders } from '@/test/utils';

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});
```

## 📱 Offline Support

O React Query oferece suporte offline automático:

- **Retry on reconnect**: Tentativas automáticas quando volta online
- **Background sync**: Sincronização em background
- **Cache persistence**: Cache persiste entre sessões

## 🔍 Debugging

### React Query Devtools

Disponível apenas em desenvolvimento:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Já incluído em QueryProvider
```

### API Status

```tsx
import { ApiStatus } from '@/components/api';

<ApiStatus />; // Mostra status da API (online/offline)
```

## 🚀 Próximos Passos

1. **Implementar testes unitários** para hooks e serviços
2. **Adicionar interceptadores** para refresh automático de tokens
3. **Implementar cache persistente** com React Query Persist
4. **Adicionar métricas** de performance da API
5. **Configurar Sentry** para monitoramento de erros

---

Esta arquitetura foi projetada para ser escalável, performante e fácil de manter. Siga os padrões estabelecidos para garantir consistência no projeto.
