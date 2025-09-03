from rest_framework import generics, filters, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiExample, OpenApiParameter
from drf_spectacular.openapi import OpenApiTypes
from .models import Category, LearningPath, Lesson, Quiz, Achievement
from .serializers import (
    CategorySerializer, LearningPathListSerializer, LearningPathDetailSerializer,
    LessonDetailSerializer, QuizSerializer, AchievementSerializer
)


@extend_schema(
    tags=['learning'],
    summary='Listar categorias',
    description='''
    Retorna todas as categorias ativas de caminhos de aprendizado.
    
    As categorias são organizadas por ordem e incluem informações sobre:
    - Nome e descrição da categoria
    - Ícone e cor para interface
    - Contador de caminhos de aprendizado disponíveis
    ''',
    responses={
        200: OpenApiExample(
            'Lista de categorias',
            value=[
                {
                    'id': 1,
                    'name': 'Histórias Bíblicas',
                    'slug': 'historias-biblicas',
                    'description': 'Histórias do Antigo e Novo Testamento adaptadas para crianças',
                    'icon': 'book',
                    'color': '#3b82f6',
                    'order': 1,
                    'is_active': True,
                    'learning_paths_count': 12
                },
                {
                    'id': 2,
                    'name': 'Valores Cristãos',
                    'slug': 'valores-cristaos',
                    'description': 'Ensinamentos sobre amor, bondade, perdão e outros valores',
                    'icon': 'heart',
                    'color': '#ef4444',
                    'order': 2,
                    'is_active': True,
                    'learning_paths_count': 8
                }
            ],
            response_only=True
        )
    }
)
class CategoryListView(generics.ListAPIView):
    """
    Lista todas as categorias ativas
    """
    queryset = Category.objects.filter(is_active=True).order_by('order')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(
    tags=['learning'],
    summary='Listar caminhos de aprendizado',
    description='''
    Lista todos os caminhos de aprendizado publicados com opções avançadas de filtragem e busca.
    
    **Filtros disponíveis:**
    - `category`: ID da categoria
    - `difficulty_level`: beginner, intermediate, advanced  
    - `age_group`: 3-5, 6-8, 9-11, 12-14, 15+
    - `is_featured`: true/false para caminhos em destaque
    - `tags`: busca por tags separadas por vírgula
    
    **Busca:** Pesquisa no título, descrição e tags
    
    **Ordenação:** Por data de criação, título ou duração estimada
    
    Para usuários autenticados, inclui informações de progresso individual.
    ''',
    parameters=[
        OpenApiParameter('category', OpenApiTypes.INT, description='ID da categoria'),
        OpenApiParameter('difficulty_level', OpenApiTypes.STR, description='Nível de dificuldade'),
        OpenApiParameter('age_group', OpenApiTypes.STR, description='Faixa etária'),
        OpenApiParameter('is_featured', OpenApiTypes.BOOL, description='Apenas caminhos em destaque'),
        OpenApiParameter('tags', OpenApiTypes.STR, description='Tags separadas por vírgula'),
        OpenApiParameter('search', OpenApiTypes.STR, description='Busca no título e descrição'),
        OpenApiParameter('ordering', OpenApiTypes.STR, description='Campo para ordenação'),
    ],
    responses={
        200: LearningPathListSerializer(many=True)
    }
)
class LearningPathListView(generics.ListAPIView):
    """
    Lista caminhos de aprendizado com filtros
    """
    serializer_class = LearningPathListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'difficulty_level', 'age_group', 'is_featured']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['created_at', 'title', 'estimated_duration_minutes']
    ordering = ['-is_featured', 'order', '-created_at']
    
    def get_queryset(self):
        queryset = LearningPath.objects.filter(is_published=True).select_related('category')
        
        # Filtro por tags
        tags = self.request.query_params.get('tags', None)
        if tags:
            tag_list = [tag.strip() for tag in tags.split(',')]
            tag_query = Q()
            for tag in tag_list:
                tag_query |= Q(tags__icontains=tag)
            queryset = queryset.filter(tag_query)
        
        return queryset


class LearningPathDetailView(generics.RetrieveAPIView):
    """
    Detalhes de um caminho de aprendizado específico
    """
    queryset = LearningPath.objects.filter(is_published=True)
    serializer_class = LearningPathDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]


class LessonDetailView(generics.RetrieveAPIView):
    """
    Detalhes de uma lição específica
    """
    queryset = Lesson.objects.filter(is_published=True)
    serializer_class = LessonDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]
    
    def get_object(self):
        path_slug = self.kwargs.get('path_slug')
        lesson_slug = self.kwargs.get('lesson_slug')
        
        return generics.get_object_or_404(
            Lesson,
            learning_path__slug=path_slug,
            slug=lesson_slug,
            is_published=True,
            learning_path__is_published=True
        )


class QuizDetailView(generics.RetrieveAPIView):
    """
    Detalhes de um quiz
    """
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        lesson_id = self.kwargs.get('lesson_id')
        lesson = generics.get_object_or_404(
            Lesson,
            id=lesson_id,
            is_published=True
        )
        
        return generics.get_object_or_404(Quiz, lesson=lesson)


class AchievementListView(generics.ListAPIView):
    """
    Lista todas as conquistas disponíveis
    """
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['achievement_type']
    
    def get_queryset(self):
        # Mostrar conquistas ocultas apenas se já foram obtidas
        queryset = Achievement.objects.filter(is_active=True)
        
        if self.request.user.is_authenticated:
            from apps.progress.models import UserAchievement
            earned_achievements = UserAchievement.objects.filter(
                user=self.request.user
            ).values_list('achievement_id', flat=True)
            
            # Incluir conquistas visíveis ou já obtidas
            queryset = queryset.filter(
                Q(is_hidden=False) | Q(id__in=earned_achievements)
            )
        else:
            queryset = queryset.filter(is_hidden=False)
        
        return queryset.order_by('achievement_type', 'name')


@extend_schema(
    tags=['learning'],
    summary='Conteúdo destacado',
    description='''
    Retorna o conteúdo em destaque para exibição na página inicial.
    
    Inclui:
    - **Caminhos em destaque**: Até 6 caminhos marcados como featured
    - **Categorias populares**: Categorias com maior número de caminhos
    
    Este endpoint é público e não requer autenticação.
    ''',
    responses={
        200: OpenApiExample(
            'Conteúdo destacado',
            value={
                'featured_paths': [
                    {
                        'id': 'uuid-do-caminho',
                        'title': 'A História de Noé',
                        'slug': 'historia-de-noe',
                        'description': 'Aprenda sobre fé e obediência com a história da arca de Noé',
                        'category': {
                            'id': 1,
                            'name': 'Histórias Bíblicas',
                            'slug': 'historias-biblicas'
                        },
                        'difficulty_level': 'beginner',
                        'age_group': '6-8',
                        'estimated_duration_minutes': 25,
                        'cover_image': 'https://exemplo.com/imagem.jpg',
                        'is_featured': True,
                        'total_lessons': 5
                    }
                ],
                'popular_categories': [
                    {
                        'id': 1,
                        'name': 'Histórias Bíblicas',
                        'slug': 'historias-biblicas',
                        'description': 'Histórias adaptadas para crianças',
                        'icon': 'book',
                        'color': '#3b82f6',
                        'learning_paths_count': 12
                    }
                ]
            },
            response_only=True
        )
    }
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def featured_content(request):
    """
    Conteúdo destacado na página inicial
    """
    # Caminhos em destaque
    featured_paths = LearningPath.objects.filter(
        is_published=True,
        is_featured=True
    ).select_related('category')[:6]
    
    # Categorias populares
    popular_categories = Category.objects.filter(
        is_active=True,
        learning_paths__is_published=True
    ).annotate(
        paths_count=Count('learning_paths')
    ).order_by('-paths_count')[:4]
    
    return Response({
        'featured_paths': LearningPathListSerializer(
            featured_paths, 
            many=True, 
            context={'request': request}
        ).data,
        'popular_categories': CategorySerializer(
            popular_categories, 
            many=True
        ).data
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_recommendations(request):
    """
    Recomendações personalizadas para o usuário
    """
    user = request.user
    
    # Baseado na faixa etária
    age_based = []
    if hasattr(user, 'birth_date') and user.birth_date:
        from datetime import date
        age = (date.today() - user.birth_date).days // 365
        
        if age <= 5:
            age_group = '3-5'
        elif age <= 8:
            age_group = '6-8'
        elif age <= 11:
            age_group = '9-11'
        else:
            age_group = '12-14'
        
        age_based = LearningPath.objects.filter(
            is_published=True,
            age_group=age_group
        ).select_related('category')[:3]
    
    # Baseado no progresso atual
    from apps.progress.models import LearningPathProgress
    
    # Caminhos em progresso
    in_progress = LearningPathProgress.objects.filter(
        user=user,
        status='in_progress'
    ).select_related('learning_path')[:3]
    
    # Caminhos similares aos completados
    completed_categories = LearningPathProgress.objects.filter(
        user=user,
        status='completed'
    ).values_list('learning_path__category', flat=True).distinct()
    
    similar_paths = LearningPath.objects.filter(
        is_published=True,
        category__in=completed_categories
    ).exclude(
        user_progress__user=user
    ).select_related('category')[:3]
    
    return Response({
        'age_based': LearningPathListSerializer(
            age_based, 
            many=True, 
            context={'request': request}
        ).data,
        'in_progress': [{
            'learning_path': LearningPathListSerializer(
                progress.learning_path, 
                context={'request': request}
            ).data,
            'progress_percentage': progress.progress_percentage
        } for progress in in_progress],
        'similar_to_completed': LearningPathListSerializer(
            similar_paths, 
            many=True, 
            context={'request': request}
        ).data
    })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_suggestions(request):
    """
    Sugestões de busca baseadas em conteúdo popular
    """
    query = request.query_params.get('q', '').strip()
    
    if len(query) < 2:
        return Response({'suggestions': []})
    
    # Buscar em títulos de caminhos
    path_suggestions = LearningPath.objects.filter(
        is_published=True,
        title__icontains=query
    ).values_list('title', flat=True)[:5]
    
    # Buscar em categorias
    category_suggestions = Category.objects.filter(
        is_active=True,
        name__icontains=query
    ).values_list('name', flat=True)[:3]
    
    # Buscar em tags
    tag_suggestions = []
    paths_with_tags = LearningPath.objects.filter(
        is_published=True,
        tags__icontains=query
    ).values_list('tags', flat=True)
    
    for tags_str in paths_with_tags:
        if tags_str:
            tags = [tag.strip() for tag in tags_str.split(',')]
            matching_tags = [tag for tag in tags if query.lower() in tag.lower()]
            tag_suggestions.extend(matching_tags[:2])
    
    # Remover duplicatas
    tag_suggestions = list(set(tag_suggestions))[:3]
    
    all_suggestions = list(path_suggestions) + list(category_suggestions) + tag_suggestions
    
    return Response({
        'suggestions': all_suggestions[:10]
    })