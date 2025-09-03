# MyLightWay API

API REST em Django para a plataforma de educação cristã infantil MyLightWay.

## 🚀 Tecnologias

- **Django 4.2** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados principal
- **Redis** - Cache e sessões
- **JWT** - Autenticação
- **Celery** - Tarefas assíncronas

## 📋 Pré-requisitos

- Python 3.8+
- PostgreSQL 12+
- Redis 6+
- pip ou pipenv

## ⚙️ Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd mylightway/api
```

### 2. Crie um ambiente virtual
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

### 3. Instale as dependências
```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 5. Execute as migrações
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Crie um superusuário
```bash
python manage.py createsuperuser
```

### 7. Execute o servidor de desenvolvimento
```bash
python manage.py runserver
```

A API estará disponível em `http://localhost:8000/`

## 📡 Endpoints Principais

### Autenticação
- `POST /api/v1/auth/register/` - Registro de usuário
- `POST /api/v1/auth/login/` - Login (obtém tokens JWT)
- `POST /api/v1/auth/token/refresh/` - Renovar token
- `GET /api/v1/auth/me/` - Dados do usuário logado

### Aprendizado
- `GET /api/v1/learning/categories/` - Listar categorias
- `GET /api/v1/learning/paths/` - Listar caminhos de aprendizado
- `GET /api/v1/learning/paths/{slug}/` - Detalhes do caminho
- `GET /api/v1/learning/paths/{path}/lessons/{lesson}/` - Detalhes da lição

### Progresso (em desenvolvimento)
- `GET /api/v1/progress/` - Progresso do usuário
- `POST /api/v1/progress/` - Atualizar progresso

## 🏗️ Arquitetura

```
api/
├── mylightway_api/          # Configurações do Django
├── apps/
│   ├── accounts/            # Autenticação e usuários
│   ├── learning/            # Caminhos e lições
│   ├── content/             # Histórias, orações, cânticos
│   ├── progress/            # Tracking de progresso
│   └── common/              # Utilitários compartilhados
├── requirements.txt         # Dependências
└── manage.py               # Django CLI
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação:

```bash
# Login
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@email.com", "password": "senha"}'

# Usar token nas requisições
curl -H "Authorization: Bearer <seu-token>" \
  http://localhost:8000/api/v1/auth/me/
```

## 📊 Modelos de Dados

### Usuários
- **User**: Usuário base (criança, responsável, admin)
- **Profile**: Perfil estendido do usuário
- **UserSettings**: Configurações personalizadas
- **ParentChildRelationship**: Relacionamentos familiares

### Aprendizado
- **Category**: Categorias dos caminhos
- **LearningPath**: Caminhos de aprendizado (trilhas)
- **Lesson**: Lições individuais
- **Quiz**: Quizzes das lições
- **Question/Answer**: Perguntas e respostas
- **Achievement**: Conquistas e medalhas

### Progresso
- **LearningPathProgress**: Progresso nos caminhos
- **LessonProgress**: Progresso nas lições
- **QuizAttempt**: Tentativas de quiz
- **UserAchievement**: Conquistas obtidas
- **StudyStreak**: Sequências de estudo
- **DailyGoal**: Metas diárias

## 🚧 Em Desenvolvimento

- [ ] Implementação completa do app `content`
- [ ] Implementação completa do app `progress`
- [ ] Testes automatizados
- [ ] Sistema de notificações
- [ ] API de relatórios para pais

## 🧪 Testes

```bash
# Instalar dependências de teste
pip install pytest pytest-django

# Executar testes
pytest
```

## 🐳 Docker (opcional)

```bash
# Construir imagem
docker build -t mylightway-api .

# Executar com docker-compose
docker-compose up -d
```

## 📝 Documentação da API

Com o servidor rodando, acesse:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`
- Schema JSON: `http://localhost:8000/api/schema/`

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.