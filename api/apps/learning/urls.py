from django.urls import path
from . import views

app_name = 'learning'

urlpatterns = [
    # Categorias
    path('categories/', views.CategoryListView.as_view(), name='categories'),
    
    # Caminhos de aprendizado
    path('paths/', views.LearningPathListView.as_view(), name='paths_list'),
    path('paths/<slug:slug>/', views.LearningPathDetailView.as_view(), name='paths_detail'),
    
    # Lições
    path('paths/<slug:path_slug>/lessons/<slug:lesson_slug>/', 
         views.LessonDetailView.as_view(), name='lesson_detail'),
    
    # Quiz
    path('lessons/<uuid:lesson_id>/quiz/', views.QuizDetailView.as_view(), name='quiz_detail'),
    
    # Conquistas
    path('achievements/', views.AchievementListView.as_view(), name='achievements'),
    
    # Conteúdo destacado e recomendações
    path('featured/', views.featured_content, name='featured_content'),
    path('recommendations/', views.user_recommendations, name='user_recommendations'),
    path('search-suggestions/', views.search_suggestions, name='search_suggestions'),
]