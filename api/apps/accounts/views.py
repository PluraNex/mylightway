from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiExample, OpenApiParameter
from drf_spectacular.openapi import OpenApiTypes
from .models import Profile, UserSettings, ParentChildRelationship
from .serializers import (
    UserRegistrationSerializer, UserSerializer, ProfileSerializer,
    UserSettingsSerializer, ParentChildRelationshipSerializer,
    ChildrenListSerializer, UserUpdateSerializer, ChangePasswordSerializer
)
from apps.common.permissions import IsParentUser, IsOwnerOrReadOnly

User = get_user_model()


@extend_schema(
    tags=['authentication'],
    summary='Registrar novo usuário',
    description='''
    Cria uma nova conta de usuário no sistema. 
    
    Tipos de usuário disponíveis:
    - **child**: Para crianças que utilizarão a plataforma
    - **parent**: Para pais/responsáveis que monitorarão o progresso
    - **admin**: Para administradores do sistema
    
    Após o registro bem-sucedido, um perfil e configurações padrão são criados automaticamente.
    ''',
    examples=[
        OpenApiExample(
            'Registro de criança',
            summary='Exemplo de registro para criança',
            description='Dados para registrar uma nova criança',
            value={
                'email': 'maria@exemplo.com',
                'username': 'maria_silva',
                'password': 'MinhaSenh@123',
                'password_confirm': 'MinhaSenh@123',
                'first_name': 'Maria',
                'last_name': 'Silva',
                'user_type': 'child',
                'birth_date': '2015-03-15'
            },
            request_only=True
        ),
        OpenApiExample(
            'Registro de responsável',
            summary='Exemplo de registro para responsável',
            description='Dados para registrar um novo responsável',
            value={
                'email': 'joao@exemplo.com',
                'username': 'joao_silva',
                'password': 'MinhaSenh@123',
                'password_confirm': 'MinhaSenh@123',
                'first_name': 'João',
                'last_name': 'Silva',
                'user_type': 'parent',
                'birth_date': '1985-08-22'
            },
            request_only=True
        )
    ],
    responses={
        201: UserSerializer,
        400: OpenApiExample(
            'Erro de validação',
            value={
                'error': True,
                'message': 'Erro de validação',
                'details': {
                    'email': ['Usuário com este email já existe.'],
                    'password': ['Esta senha é muito comum.']
                }
            }
        )
    }
)
class RegisterView(generics.CreateAPIView):
    """
    Registro de novos usuários
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(
    tags=['authentication'],
    summary='Login do usuário',
    description='''
    Autentica o usuário e retorna tokens JWT (access + refresh) junto com as informações do usuário.
    
    O token de acesso deve ser usado nas requisições autenticadas no header:
    `Authorization: Bearer <access_token>`
    
    O token de refresh pode ser usado para obter novos tokens quando o access token expirar.
    ''',
    examples=[
        OpenApiExample(
            'Login com email',
            summary='Login usando email e senha',
            value={
                'email': 'maria@exemplo.com',
                'password': 'MinhaSenh@123'
            },
            request_only=True
        )
    ],
    responses={
        200: OpenApiExample(
            'Login bem-sucedido',
            value={
                'access': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
                'refresh': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
                'user': {
                    'id': 'uuid-do-usuario',
                    'email': 'maria@exemplo.com',
                    'username': 'maria_silva',
                    'first_name': 'Maria',
                    'last_name': 'Silva',
                    'full_name': 'Maria Silva',
                    'user_type': 'child',
                    'birth_date': '2015-03-15',
                    'avatar': None,
                    'is_active': True
                }
            },
            response_only=True
        ),
        401: OpenApiExample(
            'Credenciais inválidas',
            value={
                'detail': 'No active account found with the given credentials'
            }
        )
    }
)
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Login customizado com informações adicionais do usuário
    """
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Adicionar informações do usuário à resposta
            try:
                user = User.objects.get(email=request.data.get('email'))
                user_data = UserSerializer(user).data
                response.data['user'] = user_data
            except User.DoesNotExist:
                pass
        return response


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Visualizar e atualizar perfil do usuário
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile


class UserSettingsView(generics.RetrieveUpdateAPIView):
    """
    Configurações do usuário
    """
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        settings, created = UserSettings.objects.get_or_create(user=self.request.user)
        return settings


class UserUpdateView(generics.UpdateAPIView):
    """
    Atualizar dados básicos do usuário
    """
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    """
    Alterar senha do usuário
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({
                'message': 'Senha alterada com sucesso'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParentChildRelationshipListCreateView(generics.ListCreateAPIView):
    """
    Listar e criar relacionamentos entre pais e filhos
    """
    serializer_class = ParentChildRelationshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsParentUser]
    
    def get_queryset(self):
        return ParentChildRelationship.objects.filter(parent=self.request.user)


class ParentChildRelationshipDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Detalhes, atualizar e deletar relacionamento
    """
    serializer_class = ParentChildRelationshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsParentUser]
    
    def get_queryset(self):
        return ParentChildRelationship.objects.filter(parent=self.request.user)


class ChildrenListView(generics.ListAPIView):
    """
    Listar crianças de um responsável
    """
    serializer_class = ChildrenListSerializer
    permission_classes = [permissions.IsAuthenticated, IsParentUser]
    
    def get_queryset(self):
        relationships = ParentChildRelationship.objects.filter(
            parent=self.request.user
        ).select_related('child')
        
        return User.objects.filter(
            id__in=[rel.child.id for rel in relationships]
        )


class ChildDetailView(generics.RetrieveAPIView):
    """
    Detalhes de uma criança específica
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsParentUser]
    
    def get_object(self):
        child_id = self.kwargs['child_id']
        
        # Verificar se o usuário tem acesso a essa criança
        relationship = get_object_or_404(
            ParentChildRelationship,
            parent=self.request.user,
            child__id=child_id
        )
        
        return relationship.child


@extend_schema(
    tags=['authentication'],
    summary='Estatísticas do dashboard',
    description='''
    Retorna estatísticas personalizadas baseadas no tipo de usuário logado.
    
    **Para crianças (user_type: child):**
    - Progresso em caminhos de aprendizado
    - Lições completadas
    - Conquistas obtidas
    - Sequência de estudos atual
    - Progresso da meta diária
    
    **Para pais/responsáveis (user_type: parent):**
    - Número de crianças vinculadas
    - Crianças com atividade recente
    - Visão geral dos caminhos em progresso
    ''',
    responses={
        200: OpenApiExample(
            'Dashboard de criança',
            value={
                'user_type': 'child',
                'learning_paths': {
                    'total': 5,
                    'completed': 2,
                    'in_progress': 3
                },
                'lessons': {
                    'total': 24,
                    'completed': 18,
                    'completion_rate': 75.0
                },
                'achievements': {
                    'total': 8
                },
                'streak': {
                    'current': 5,
                    'longest': 12
                },
                'daily_goal': {
                    'achieved': True,
                    'progress_percent': 100
                }
            },
            response_only=True
        )
    }
)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_dashboard_stats(request):
    """
    Estatísticas do dashboard do usuário
    """
    user = request.user
    
    if user.user_type == 'child':
        # Estatísticas para crianças
        from apps.progress.models import (
            LearningPathProgress, LessonProgress, 
            UserAchievement, StudyStreak, DailyGoal
        )
        from django.utils import timezone
        from django.db.models import Count, Avg
        
        # Progresso dos caminhos
        total_paths = LearningPathProgress.objects.filter(user=user).count()
        completed_paths = LearningPathProgress.objects.filter(
            user=user, status='completed'
        ).count()
        
        # Progresso das lições
        total_lessons = LessonProgress.objects.filter(user=user).count()
        completed_lessons = LessonProgress.objects.filter(
            user=user, status='completed'
        ).count()
        
        # Conquistas
        total_achievements = UserAchievement.objects.filter(user=user).count()
        
        # Sequência de estudos
        try:
            streak = StudyStreak.objects.get(user=user)
            current_streak = streak.current_streak
            longest_streak = streak.longest_streak
        except StudyStreak.DoesNotExist:
            current_streak = 0
            longest_streak = 0
        
        # Meta de hoje
        today = timezone.now().date()
        try:
            daily_goal = DailyGoal.objects.get(user=user, date=today)
            goal_achieved = daily_goal.achieved
            progress_percent = min(100, (daily_goal.completed_minutes / daily_goal.goal_minutes) * 100)
        except DailyGoal.DoesNotExist:
            goal_achieved = False
            progress_percent = 0
        
        return Response({
            'user_type': 'child',
            'learning_paths': {
                'total': total_paths,
                'completed': completed_paths,
                'in_progress': total_paths - completed_paths
            },
            'lessons': {
                'total': total_lessons,
                'completed': completed_lessons,
                'completion_rate': (completed_lessons / total_lessons * 100) if total_lessons > 0 else 0
            },
            'achievements': {
                'total': total_achievements
            },
            'streak': {
                'current': current_streak,
                'longest': longest_streak
            },
            'daily_goal': {
                'achieved': goal_achieved,
                'progress_percent': progress_percent
            }
        })
    
    elif user.user_type in ['parent', 'admin']:
        # Estatísticas para pais/responsáveis
        children_count = ParentChildRelationship.objects.filter(parent=user).count()
        
        # Buscar estatísticas das crianças
        children_ids = ParentChildRelationship.objects.filter(
            parent=user
        ).values_list('child_id', flat=True)
        
        from apps.progress.models import LearningPathProgress, LessonProgress
        
        total_child_paths = LearningPathProgress.objects.filter(
            user__id__in=children_ids
        ).count()
        
        active_children = LearningPathProgress.objects.filter(
            user__id__in=children_ids,
            status='in_progress'
        ).values('user').distinct().count()
        
        return Response({
            'user_type': 'parent',
            'children': {
                'total': children_count,
                'active': active_children
            },
            'overview': {
                'total_learning_paths': total_child_paths
            }
        })
    
    return Response({'message': 'Tipo de usuário não suportado'})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_me(request):
    """
    Informações completas do usuário logado
    """
    user_data = UserSerializer(request.user).data
    
    # Adicionar informações do perfil
    try:
        profile = Profile.objects.get(user=request.user)
        user_data['profile'] = ProfileSerializer(profile).data
    except Profile.DoesNotExist:
        user_data['profile'] = None
    
    # Adicionar configurações
    try:
        settings = UserSettings.objects.get(user=request.user)
        user_data['settings'] = UserSettingsSerializer(settings).data
    except UserSettings.DoesNotExist:
        user_data['settings'] = None
    
    return Response(user_data)