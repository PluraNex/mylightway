from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
import uuid

User = get_user_model()


class Category(models.Model):
    """
    Categorias dos caminhos de aprendizado
    """
    name = models.CharField(max_length=100, unique=True, verbose_name='Nome')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='Slug')
    description = models.TextField(blank=True, verbose_name='Descrição')
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text='Nome do ícone (ex: book, heart, cross)',
        verbose_name='Ícone'
    )
    color = models.CharField(
        max_length=7,
        default='#6366f1',
        help_text='Cor em hexadecimal',
        verbose_name='Cor'
    )
    order = models.PositiveIntegerField(default=0, verbose_name='Ordem')
    is_active = models.BooleanField(default=True, verbose_name='Ativo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        db_table = 'categories'
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class LearningPath(models.Model):
    """
    Caminhos de aprendizado (trilhas de estudo bíblico)
    """
    DIFFICULTY_LEVELS = [
        ('beginner', 'Iniciante'),
        ('intermediate', 'Intermediário'),
        ('advanced', 'Avançado'),
    ]
    
    AGE_GROUPS = [
        ('3-5', '3-5 anos'),
        ('6-8', '6-8 anos'),
        ('9-11', '9-11 anos'),
        ('12-14', '12-14 anos'),
        ('15+', '15+ anos'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug')
    description = models.TextField(verbose_name='Descrição')
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='learning_paths',
        verbose_name='Categoria'
    )
    difficulty_level = models.CharField(
        max_length=20,
        choices=DIFFICULTY_LEVELS,
        default='beginner',
        verbose_name='Nível de dificuldade'
    )
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUPS,
        verbose_name='Faixa etária'
    )
    estimated_duration_minutes = models.PositiveIntegerField(
        validators=[MinValueValidator(5), MaxValueValidator(300)],
        verbose_name='Duração estimada (minutos)'
    )
    cover_image = models.ImageField(
        upload_to='learning_paths/',
        null=True,
        blank=True,
        verbose_name='Imagem de capa'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Destacado')
    is_published = models.BooleanField(default=False, verbose_name='Publicado')
    order = models.PositiveIntegerField(default=0, verbose_name='Ordem')
    tags = models.CharField(
        max_length=500,
        blank=True,
        help_text='Tags separadas por vírgula',
        verbose_name='Tags'
    )
    objectives = models.JSONField(
        default=list,
        help_text='Lista de objetivos de aprendizado',
        verbose_name='Objetivos'
    )
    prerequisites = models.JSONField(
        default=list,
        help_text='Lista de pré-requisitos',
        verbose_name='Pré-requisitos'
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_paths',
        verbose_name='Criado por'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Caminho de Aprendizado'
        verbose_name_plural = 'Caminhos de Aprendizado'
        db_table = 'learning_paths'
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['difficulty_level']),
            models.Index(fields=['age_group']),
            models.Index(fields=['is_featured']),
            models.Index(fields=['is_published']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    @property
    def total_lessons(self):
        return self.lessons.count()
    
    @property
    def completed_lessons_count(self):
        from apps.progress.models import LessonProgress
        return LessonProgress.objects.filter(
            lesson__learning_path=self,
            status='completed'
        ).count()


class Lesson(models.Model):
    """
    Lições dentro de um caminho de aprendizado
    """
    LESSON_TYPES = [
        ('video', 'Vídeo'),
        ('text', 'Texto'),
        ('interactive', 'Interativa'),
        ('quiz', 'Quiz'),
        ('activity', 'Atividade'),
        ('game', 'Jogo'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    learning_path = models.ForeignKey(
        LearningPath,
        on_delete=models.CASCADE,
        related_name='lessons',
        verbose_name='Caminho de aprendizado'
    )
    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(max_length=200, verbose_name='Slug')
    description = models.TextField(blank=True, verbose_name='Descrição')
    lesson_type = models.CharField(
        max_length=20,
        choices=LESSON_TYPES,
        default='text',
        verbose_name='Tipo da lição'
    )
    content = models.TextField(blank=True, verbose_name='Conteúdo')
    video_url = models.URLField(blank=True, verbose_name='URL do vídeo')
    audio_file = models.FileField(
        upload_to='lessons/audio/',
        null=True,
        blank=True,
        verbose_name='Arquivo de áudio'
    )
    thumbnail = models.ImageField(
        upload_to='lessons/thumbnails/',
        null=True,
        blank=True,
        verbose_name='Miniatura'
    )
    order = models.PositiveIntegerField(verbose_name='Ordem')
    estimated_duration_minutes = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(60)],
        default=5,
        verbose_name='Duração estimada (minutos)'
    )
    bible_verses = models.JSONField(
        default=list,
        help_text='Lista de referências bíblicas relacionadas',
        verbose_name='Versículos bíblicos'
    )
    key_concepts = models.JSONField(
        default=list,
        help_text='Lista de conceitos-chave abordados',
        verbose_name='Conceitos-chave'
    )
    is_published = models.BooleanField(default=False, verbose_name='Publicado')
    is_free = models.BooleanField(default=True, verbose_name='Gratuito')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Lição'
        verbose_name_plural = 'Lições'
        db_table = 'lessons'
        ordering = ['learning_path', 'order']
        unique_together = ['learning_path', 'slug']
        indexes = [
            models.Index(fields=['learning_path']),
            models.Index(fields=['lesson_type']),
            models.Index(fields=['is_published']),
            models.Index(fields=['order']),
        ]
    
    def __str__(self):
        return f"{self.learning_path.title} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Quiz(models.Model):
    """
    Quiz associado a uma lição
    """
    lesson = models.OneToOneField(
        Lesson,
        on_delete=models.CASCADE,
        related_name='quiz',
        verbose_name='Lição'
    )
    title = models.CharField(max_length=200, verbose_name='Título')
    description = models.TextField(blank=True, verbose_name='Descrição')
    passing_score = models.PositiveIntegerField(
        default=70,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        verbose_name='Pontuação mínima (%)'
    )
    max_attempts = models.PositiveIntegerField(
        default=3,
        validators=[MinValueValidator(1)],
        verbose_name='Tentativas máximas'
    )
    time_limit_minutes = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(60)],
        verbose_name='Limite de tempo (minutos)'
    )
    randomize_questions = models.BooleanField(
        default=True,
        verbose_name='Randomizar perguntas'
    )
    show_correct_answers = models.BooleanField(
        default=True,
        verbose_name='Mostrar respostas corretas'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Quiz'
        verbose_name_plural = 'Quizzes'
        db_table = 'quizzes'
    
    def __str__(self):
        return f"Quiz: {self.title}"
    
    @property
    def total_questions(self):
        return self.questions.count()


class Question(models.Model):
    """
    Perguntas de um quiz
    """
    QUESTION_TYPES = [
        ('multiple_choice', 'Múltipla escolha'),
        ('true_false', 'Verdadeiro/Falso'),
        ('fill_blank', 'Preencher lacuna'),
        ('matching', 'Correspondência'),
    ]
    
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='questions',
        verbose_name='Quiz'
    )
    question_text = models.TextField(verbose_name='Texto da pergunta')
    question_type = models.CharField(
        max_length=20,
        choices=QUESTION_TYPES,
        default='multiple_choice',
        verbose_name='Tipo da pergunta'
    )
    explanation = models.TextField(
        blank=True,
        verbose_name='Explicação'
    )
    points = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        verbose_name='Pontos'
    )
    order = models.PositiveIntegerField(verbose_name='Ordem')
    image = models.ImageField(
        upload_to='questions/',
        null=True,
        blank=True,
        verbose_name='Imagem'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    
    class Meta:
        verbose_name = 'Pergunta'
        verbose_name_plural = 'Perguntas'
        db_table = 'questions'
        ordering = ['quiz', 'order']
        indexes = [
            models.Index(fields=['quiz']),
            models.Index(fields=['question_type']),
        ]
    
    def __str__(self):
        return f"{self.quiz.title} - Pergunta {self.order}"


class Answer(models.Model):
    """
    Respostas possíveis para uma pergunta
    """
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='answers',
        verbose_name='Pergunta'
    )
    answer_text = models.TextField(verbose_name='Texto da resposta')
    is_correct = models.BooleanField(default=False, verbose_name='Resposta correta')
    order = models.PositiveIntegerField(verbose_name='Ordem')
    
    class Meta:
        verbose_name = 'Resposta'
        verbose_name_plural = 'Respostas'
        db_table = 'answers'
        ordering = ['question', 'order']
        indexes = [
            models.Index(fields=['question']),
            models.Index(fields=['is_correct']),
        ]
    
    def __str__(self):
        return f"{self.question} - {self.answer_text[:50]}"


class Achievement(models.Model):
    """
    Conquistas que os usuários podem obter
    """
    ACHIEVEMENT_TYPES = [
        ('progress', 'Progresso'),
        ('streak', 'Sequência'),
        ('quiz', 'Quiz'),
        ('special', 'Especial'),
    ]
    
    name = models.CharField(max_length=100, unique=True, verbose_name='Nome')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='Slug')
    description = models.TextField(verbose_name='Descrição')
    achievement_type = models.CharField(
        max_length=20,
        choices=ACHIEVEMENT_TYPES,
        verbose_name='Tipo de conquista'
    )
    icon = models.CharField(
        max_length=50,
        help_text='Nome do ícone',
        verbose_name='Ícone'
    )
    badge_color = models.CharField(
        max_length=7,
        default='#fbbf24',
        help_text='Cor da medalha em hexadecimal',
        verbose_name='Cor da medalha'
    )
    points = models.PositiveIntegerField(
        default=10,
        verbose_name='Pontos concedidos'
    )
    requirements = models.JSONField(
        help_text='Critérios para obter a conquista',
        verbose_name='Requisitos'
    )
    is_hidden = models.BooleanField(
        default=False,
        verbose_name='Conquista secreta'
    )
    is_active = models.BooleanField(default=True, verbose_name='Ativo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    
    class Meta:
        verbose_name = 'Conquista'
        verbose_name_plural = 'Conquistas'
        db_table = 'achievements'
        ordering = ['achievement_type', 'name']
        indexes = [
            models.Index(fields=['achievement_type']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)