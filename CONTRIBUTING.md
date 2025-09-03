# 🤝 Guia de Contribuição - MyLightWay

Obrigado por seu interesse em contribuir para o MyLightWay! Este guia irá te ajudar a começar.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Commit](#padrões-de-commit)
- [Fluxo de Trabalho](#fluxo-de-trabalho)
- [Testes](#testes)
- [Code Review](#code-review)
- [Deploy](#deploy)

## 📜 Código de Conduta

Este projeto e todos os participantes estão sujeitos ao [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em manter este código.

## 🚀 Como Contribuir

### 🐛 Reportar Bugs

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/owner/mylightway/issues)
2. Use o template de [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
3. Inclua todas as informações necessárias

### ✨ Sugerir Funcionalidades

1. Verifique se a funcionalidade já foi sugerida
2. Use o template de [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)
3. Descreva claramente a motivação e solução proposta

### 💻 Contribuir com Código

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feat/nova-funcionalidade`)
3. Faça suas mudanças seguindo os padrões do projeto
4. Execute os testes (`npm run test`)
5. Commit usando [Conventional Commits](#padrões-de-commit)
6. Push para sua branch (`git push origin feat/nova-funcionalidade`)
7. Abra um Pull Request

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm 9+
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/owner/mylightway.git
cd mylightway

# Instale dependências
npm install

# Configure o ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento
npm run build         # Build para produção
npm run preview       # Preview da build

# Qualidade de Código
npm run lint          # ESLint
npm run lint:fix      # Fix ESLint errors
npm run format        # Prettier format
npm run format:check  # Check formatting
npm run type-check    # TypeScript type checking

# Testes
npm run test          # Testes em watch mode
npm run test:run      # Executar testes uma vez
npm run test:coverage # Coverage report
npm run test:ui       # Interface de testes

# Commits
npm run commit        # Commit interativo com Commitizen
```

## 📝 Padrões de Commit

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/) para padronizar as mensagens de commit.

### Formato

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (não afeta o código)
- **refactor**: Refatoração
- **perf**: Melhoria de performance
- **test**: Testes
- **chore**: Manutenção
- **ci**: CI/CD
- **build**: Build system
- **revert**: Reverter commit

### Exemplos

```bash
feat(auth): add login with Google
fix(api): handle 404 errors correctly  
docs: update API documentation
style: fix indentation in components
test(utils): add unit tests for helpers
```

### Usando Commitizen

Para facilitar, use o comando interativo:

```bash
npm run commit
```

## 🔄 Fluxo de Trabalho

### Branches

- `main`: Produção (sempre estável)
- `develop`: Desenvolvimento (integração)
- `feat/`: Novas funcionalidades
- `fix/`: Correções
- `docs/`: Documentação
- `chore/`: Manutenção

### Workflow

1. **Crie uma issue** antes de começar o trabalho
2. **Crie uma branch** a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/nova-funcionalidade
   ```
3. **Desenvolva** seguindo os padrões
4. **Execute testes** localmente
5. **Commit** usando Conventional Commits
6. **Push** e abra um Pull Request
7. **Code Review** pelos maintainers
8. **Merge** após aprovação

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm run test

# Testes específicos
npm run test -- --run src/components/Button.test.tsx

# Com coverage
npm run test:coverage
```

### Escrevendo Testes

- Use **Vitest** para unit tests
- Use **Testing Library** para component tests
- Siga o padrão **AAA** (Arrange, Act, Assert)

Exemplo:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    // Arrange
    const text = 'Click me';
    
    // Act
    render(<Button>{text}</Button>);
    
    // Assert
    expect(screen.getByRole('button')).toHaveTextContent(text);
  });
});
```

### Cobertura de Testes

Mantemos uma cobertura mínima de **80%**:

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## 👀 Code Review

### Para Autores

- [ ] Siga os padrões de código
- [ ] Escreva testes adequados
- [ ] Atualize documentação se necessário
- [ ] Use o template de PR
- [ ] Mantenha PRs pequenos e focados
- [ ] Responda a comentários rapidamente

### Para Revisores

- [ ] Verifique funcionalidade
- [ ] Revise qualidade do código
- [ ] Teste localmente quando necessário
- [ ] Seja construtivo nos comentários
- [ ] Aprove quando estiver satisfeito

### Critérios de Aprovação

- [ ] ✅ CI/CD pipeline passou
- [ ] ✅ Cobertura de testes mantida
- [ ] ✅ No lint errors
- [ ] ✅ Type check passou
- [ ] ✅ Pelo menos 1 aprovação
- [ ] ✅ Não há conflitos

## 🚢 Deploy

### Ambientes

- **Development**: Auto-deploy de `develop`
- **Staging**: Auto-deploy de PRs
- **Production**: Auto-deploy de `main`

### Process

1. **Development**: Push para `develop` → Deploy automático
2. **Staging**: Abrir PR → Deploy de preview
3. **Production**: Merge para `main` → Deploy para produção

### Rollback

Em caso de problemas em produção:

```bash
# Reverta o commit problemático
git revert <commit-hash>

# Ou reverta para versão anterior
git reset --hard <previous-commit>
git push --force-with-lease origin main
```

## 🎯 Boas Práticas

### Código

- **DRY** (Don't Repeat Yourself)
- **SOLID** principles
- **Clean Code** practices
- **TypeScript** strict mode
- **Accessibility** first

### Commits

- Um commit por mudança lógica
- Mensagens claras e descritivas
- Rebase antes de merge (sem merge commits)

### Performance

- Lazy loading de rotas
- Code splitting
- Otimização de imagens
- Bundle size monitoring

### Segurança

- Nunca commit secrets
- Validate all inputs
- Use HTTPS everywhere
- Keep dependencies updated

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/)
- [TanStack Query](https://tanstack.com/query/latest)

## ❓ Precisa de Ajuda?

- 💬 [Discussions](https://github.com/owner/mylightway/discussions) para perguntas gerais
- 🐛 [Issues](https://github.com/owner/mylightway/issues) para bugs e features
- 📧 Email: contato@mylightway.com

---

Obrigado por contribuir para o MyLightWay! 🌟