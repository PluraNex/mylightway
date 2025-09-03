from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import (
    Category, LearningPath, Lesson, Quiz, Question, Answer, Achievement
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Administração para categorias
    """
    list_display = ['name', 'slug', 'icon', 'color_display', 'order', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    
    def color_display(self, obj):
        return format_html(
            '<div style="width: 20px; height: 20px; background-color: {}; border-radius: 50%;"></div>',
            obj.color
        )
    color_display.short_description = 'Cor'


class LessonInline(admin.TabularInline):
    """
    Inline para lições dentro do caminho de aprendizado
    """
    model = Lesson
    extra = 0
    fields = ['title', 'lesson_type', 'order', 'is_published']
    readonly_fields = ['created_at']


@admin.register(LearningPath)
class LearningPathAdmin(admin.ModelAdmin):
    """
    Administração para caminhos de aprendizado
    """
    list_display = [
        'title', 'category', 'difficulty_level', 'age_group',
        'is_featured', 'is_published', 'total_lessons', 'created_at'
    ]
    list_filter = [
        'category', 'difficulty_level', 'age_group',
        'is_featured', 'is_published', 'created_at'
    ]
    search_fields = ['title', 'description', 'tags']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = []
    readonly_fields = ['created_at', 'updated_at', 'total_lessons']
    inlines = [LessonInline]
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'description', 'category')
        }),
        ('Configurações', {
            'fields': (
                'difficulty_level', 'age_group', 'estimated_duration_minutes',
                'is_featured', 'is_published'
            )
        }),
        ('Conteúdo', {
            'fields': ('cover_image', 'tags', 'objectives', 'prerequisites')
        }),
        ('Metadados', {
            'fields': ('created_by', 'created_at', 'updated_at', 'total_lessons'),
            'classes': ('collapse',)
        })
    )
    
    def total_lessons(self, obj):
        return obj.lessons.count()
    total_lessons.short_description = 'Total de Lições'


class QuestionInline(admin.TabularInline):
    """
    Inline para perguntas dentro do quiz
    """
    model = Question
    extra = 1
    fields = ['question_text', 'question_type', 'points', 'order']


class AnswerInline(admin.TabularInline):
    """
    Inline para respostas dentro da pergunta
    """
    model = Answer
    extra = 2
    fields = ['answer_text', 'is_correct', 'order']


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """
    Administração para lições
    """
    list_display = [
        'title', 'learning_path', 'lesson_type', 'order',
        'estimated_duration_minutes', 'is_published'
    ]
    list_filter = [
        'lesson_type', 'is_published', 'is_free',
        'learning_path__category', 'created_at'
    ]
    search_fields = [
        'title', 'description', 'learning_path__title'
    ]
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('learning_path', 'title', 'slug', 'description')
        }),
        ('Configurações', {
            'fields': (
                'lesson_type', 'order', 'estimated_duration_minutes',
                'is_published', 'is_free'
            )
        }),
        ('Conteúdo', {
            'fields': (
                'content', 'video_url', 'audio_file', 'thumbnail',
                'bible_verses', 'key_concepts'
            )
        }),
        ('Metadados', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    """
    Administração para quizzes
    """
    list_display = [
        'title', 'lesson', 'total_questions', 'passing_score',
        'max_attempts', 'time_limit_minutes'
    ]
    list_filter = ['passing_score', 'max_attempts', 'randomize_questions']
    search_fields = ['title', 'lesson__title', 'lesson__learning_path__title']
    readonly_fields = ['created_at', 'updated_at', 'total_questions']
    inlines = [QuestionInline]
    
    def total_questions(self, obj):
        return obj.questions.count()
    total_questions.short_description = 'Total de Perguntas'


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    """
    Administração para perguntas
    """
    list_display = [
        'quiz', 'question_text_short', 'question_type', 'points', 'order'
    ]
    list_filter = ['question_type', 'points', 'quiz__lesson__learning_path']
    search_fields = ['question_text', 'quiz__title']
    readonly_fields = ['created_at']
    inlines = [AnswerInline]
    
    def question_text_short(self, obj):
        return obj.question_text[:50] + '...' if len(obj.question_text) > 50 else obj.question_text
    question_text_short.short_description = 'Pergunta'


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    """
    Administração para conquistas
    """
    list_display = [
        'name', 'achievement_type', 'points', 
        'badge_color_display', 'is_hidden', 'is_active'
    ]
    list_filter = [
        'achievement_type', 'is_hidden', 'is_active', 'created_at'
    ]
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']
    
    def badge_color_display(self, obj):
        return format_html(
            '<div style="width: 20px; height: 20px; background-color: {}; border-radius: 50%;"></div>',
            obj.badge_color
        )
    badge_color_display.short_description = 'Cor da Medalha'