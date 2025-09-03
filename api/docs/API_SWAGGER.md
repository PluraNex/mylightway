# 📚 Documentação Swagger - MyLightWay API

## 🎯 Visão Geral

A API MyLightWay está completamente documentada usando **Swagger/OpenAPI 3.0** com o **drf-spectacular**. A documentação interativa permite testar todos os endpoints diretamente no navegador.

## 🔗 URLs da Documentação

Com o servidor Django rodando (`python manage.py runserver`):

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Schema JSON**: http://localhost:8000/api/schema/

## 📋 Funcionalidades da Documentação

### ✅ **Autenticação Integrada**
- Suporte completo para JWT Bearer tokens
- Botão "Authorize" para testar endpoints autenticados
- Persistência da autorização durante a sessão

### ✅ **Exemplos Interativos**
- Exemplos de request e response para todos os endpoints
- Dados realistas baseados no contexto da educação cristã infantil
- Diferentes cenários (criança, responsável, admin)

### ✅ **Filtros e Parâmetros**
- Documentação completa de todos os query parameters
- Filtros por categoria, faixa etária, dificuldade
- Opções de busca e ordenação

### ✅ **Modelos de Dados**
- Esquemas detalhados de todos os serializers
- Validações e tipos de campo documentados
- Relacionamentos entre modelos explicados

## 🏷️ Tags Organizacionais

### 🔐 **authentication**
- Registro e login de usuários
- Gerenciamento de perfis
- Relacionamentos familiares
- Estatísticas do dashboard

### 📚 **learning**
- Categorias e caminhos de aprendizado
- Lições e conteúdo educativo
- Quizzes e avaliações
- Sistema de conquistas

### 📊 **progress**
- Tracking de progresso individual
- Sequências de estudo (streaks)
- Metas diárias
- Relatórios de desempenho

### 📖 **content**
- Histórias bíblicas adaptadas
- Orações e cânticos
- Atividades práticas
- Material complementar

## 🎨 Personalizações Implementadas

### **Interface Amigável**
```python
'SWAGGER_UI_SETTINGS': {
    'deepLinking': True,           # Links diretos para operações
    'persistAuthorization': True,  # Manter autorização
    'displayOperationId': False,   # Interface mais limpa
    'defaultModelsExpandDepth': 2, # Expandir modelos
    'docExpansion': 'list',        # Expandir seções
    'filter': True,                # Busca na documentação
}
```

### **Múltiplos Ambientes**
- Servidor de desenvolvimento: `http://localhost:8000`
- Servidor de produção: `https://api.mylightway.com`

### **Segurança Documentada**
```python
'COMPONENTS': {
    'securitySchemes': {
        'jwtAuth': {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT'
        }
    }
}
```

## 📝 Exemplos de Uso

### **1. Registro de Usuário**
```json
POST /api/v1/auth/register/
{
    "email": "maria@exemplo.com",
    "username": "maria_silva",
    "password": "MinhaSenh@123",
    "password_confirm": "MinhaSenh@123",
    "first_name": "Maria",
    "last_name": "Silva",
    "user_type": "child",
    "birth_date": "2015-03-15"
}
```

### **2. Login e Obtenção de Token**
```json
POST /api/v1/auth/login/
{
    "email": "maria@exemplo.com",
    "password": "MinhaSenh@123"
}

Response:
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": "uuid-do-usuario",
        "email": "maria@exemplo.com",
        "first_name": "Maria",
        "user_type": "child"
    }
}
```

### **3. Buscar Caminhos de Aprendizado**
```bash
GET /api/v1/learning/paths/?age_group=6-8&difficulty_level=beginner&search=história
Authorization: Bearer <seu-token>
```

### **4. Obter Estatísticas do Dashboard**
```bash
GET /api/v1/auth/dashboard/
Authorization: Bearer <seu-token>
```

## 🔧 Como Testar

### **1. Acesse a Documentação**
Navegue para http://localhost:8000/api/docs/

### **2. Registre um Usuário**
- Clique em `POST /api/v1/auth/register/`
- Clique em "Try it out"
- Use o exemplo fornecido ou modifique os dados
- Clique em "Execute"

### **3. Faça Login**
- Use `POST /api/v1/auth/login/`
- Copie o token `access` da resposta

### **4. Autorize-se**
- Clique no botão "Authorize" no topo da página
- Cole o token no formato: `Bearer seu-token-aqui`
- Clique em "Authorize"

### **5. Teste Endpoints Autenticados**
Agora você pode testar todos os endpoints que requerem autenticação!

## 📊 Recursos Avançados

### **Filtros Inteligentes**
- **Por categoria**: `/api/v1/learning/paths/?category=1`
- **Por faixa etária**: `/api/v1/learning/paths/?age_group=6-8`
- **Por dificuldade**: `/api/v1/learning/paths/?difficulty_level=beginner`
- **Busca textual**: `/api/v1/learning/paths/?search=noé`
- **Múltiplos filtros**: `/api/v1/learning/paths/?category=1&age_group=6-8&is_featured=true`

### **Paginação Automática**
Todos os endpoints de listagem incluem paginação:
```json
{
    "count": 25,
    "next": "http://localhost:8000/api/v1/learning/paths/?page=2",
    "previous": null,
    "results": [...]
}
```

### **Tratamento de Erros**
Respostas de erro padronizadas:
```json
{
    "error": true,
    "message": "Descrição amigável do erro",
    "details": { "campo": ["Erro específico"] },
    "status_code": 400
}
```

## 🚀 Próximos Passos

1. **Teste todos os endpoints** na documentação interativa
2. **Explore os exemplos** para entender os formatos de dados
3. **Use os filtros** para descobrir funcionalidades avançadas
4. **Implemente no frontend** usando as especificações documentadas

## 💡 Dicas

- ✅ Use o filtro de busca no topo para encontrar endpoints rapidamente
- ✅ Os exemplos são baseados em dados reais da plataforma
- ✅ A autorização persiste entre as operações
- ✅ Todos os modelos têm validações documentadas
- ✅ Links externos levam à documentação completa do projeto

A documentação Swagger está pronta para desenvolvimento e testing completo! 🎉