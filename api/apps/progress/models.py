from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.learning.models import LearningPath, Lesson, Quiz, Question, Answer, Achievement
import uuid

User = get_user_model()


class LearningPathProgress(models.Model):
    """
    Progresso do usuário em um caminho de aprendizado
    """
    STATUS_CHOICES = [
        ('not_started', 'Não iniciado'),
        ('in_progress', 'Em progresso'),
        ('completed', 'Concluído'),
        ('paused', 'Pausado'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='learning_path_progress',
        verbose_name='Usuário'
    )
    learning_path = models.ForeignKey(
        LearningPath,
        on_delete=models.CASCADE,
        related_name='user_progress',
        verbose_name='Caminho de aprendizado'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='not_started',
        verbose_name='Status'
    )
    progress_percentage = models.PositiveIntegerField(
        default=0,
        validators=[MaxValueValidator(100)],
        verbose_name='Percentual de progresso'
    )
    current_lesson = models.ForeignKey(
        Lesson,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Lição atual'
    )
    started_at = models.DateTimeField(null=True, blank=True, verbose_name='Iniciado em')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='Concluído em')
    last_activity_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última atividade'
    )
    total_time_spent_minutes = models.PositiveIntegerField(
        default=0,
        verbose_name='Tempo total gasto (minutos)'
    )
    favorite = models.BooleanField(default=False, verbose_name='Favorito')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Progresso do Caminho'
        verbose_name_plural = 'Progressos dos Caminhos'
        db_table = 'learning_path_progress'
        unique_together = ['user', 'learning_path']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['status']),
            models.Index(fields=['last_activity_at']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} - {self.learning_path.title} ({self.progress_percentage}%)"
    
    def update_progress(self):
        """Atualiza o percentual de progresso baseado nas lições concluídas"""
        total_lessons = self.learning_path.lessons.filter(is_published=True).count()
        if total_lessons > 0:
            completed_lessons = LessonProgress.objects.filter(
                user=self.user,
                lesson__learning_path=self.learning_path,
                status='completed'
            ).count()
            self.progress_percentage = int((completed_lessons / total_lessons) * 100)
            
            if self.progress_percentage == 100:
                self.status = 'completed'
                if not self.completed_at:
                    from django.utils import timezone
                    self.completed_at = timezone.now()
            elif self.progress_percentage > 0:
                self.status = 'in_progress'
                if not self.started_at:
                    from django.utils import timezone
                    self.started_at = timezone.now()
            
            self.save()


class LessonProgress(models.Model):
    """
    Progresso do usuário em uma lição específica
    """
    STATUS_CHOICES = [
        ('not_started', 'Não iniciado'),
        ('in_progress', 'Em progresso'),
        ('completed', 'Concluído'),
        ('skipped', 'Pulado'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='lesson_progress',
        verbose_name='Usuário'
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name='user_progress',
        verbose_name='Lição'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='not_started',
        verbose_name='Status'
    )
    progress_percentage = models.PositiveIntegerField(
        default=0,
        validators=[MaxValueValidator(100)],
        verbose_name='Percentual de progresso'
    )
    time_spent_minutes = models.PositiveIntegerField(
        default=0,
        verbose_name='Tempo gasto (minutos)'
    )
    score = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MaxValueValidator(100)],
        verbose_name='Pontuação'
    )
    notes = models.TextField(
        blank=True,
        verbose_name='Anotações do usuário'
    )
    started_at = models.DateTimeField(null=True, blank=True, verbose_name='Iniciado em')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='Concluído em')
    last_activity_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última atividade'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Progresso da Lição'
        verbose_name_plural = 'Progressos das Lições'
        db_table = 'lesson_progress'
        unique_together = ['user', 'lesson']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['status']),
            models.Index(fields=['last_activity_at']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} - {self.lesson.title} ({self.progress_percentage}%)"
    
    def mark_completed(self):
        """Marca a lição como concluída"""
        self.status = 'completed'
        self.progress_percentage = 100
        if not self.completed_at:
            from django.utils import timezone
            self.completed_at = timezone.now()
        self.save()
        
        # Atualiza o progresso do caminho de aprendizado
        path_progress, _ = LearningPathProgress.objects.get_or_create(
            user=self.user,
            learning_path=self.lesson.learning_path
        )
        path_progress.update_progress()


class QuizAttempt(models.Model):
    """
    Tentativas de quiz pelos usuários
    """
    STATUS_CHOICES = [
        ('started', 'Iniciado'),
        ('completed', 'Concluído'),
        ('abandoned', 'Abandonado'),
        ('expired', 'Expirado'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='quiz_attempts',
        verbose_name='Usuário'
    )
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='attempts',
        verbose_name='Quiz'
    )
    attempt_number = models.PositiveIntegerField(verbose_name='Número da tentativa')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='started',
        verbose_name='Status'
    )
    score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name='Pontuação'
    )
    total_questions = models.PositiveIntegerField(verbose_name='Total de perguntas')
    correct_answers = models.PositiveIntegerField(default=0, verbose_name='Respostas corretas')
    wrong_answers = models.PositiveIntegerField(default=0, verbose_name='Respostas erradas')
    skipped_answers = models.PositiveIntegerField(default=0, verbose_name='Respostas puladas')
    time_spent_seconds = models.PositiveIntegerField(default=0, verbose_name='Tempo gasto (segundos)')
    passed = models.BooleanField(null=True, blank=True, verbose_name='Aprovado')
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='Iniciado em')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='Concluído em')
    
    class Meta:
        verbose_name = 'Tentativa de Quiz'
        verbose_name_plural = 'Tentativas de Quizzes'
        db_table = 'quiz_attempts'
        unique_together = ['user', 'quiz', 'attempt_number']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['quiz']),
            models.Index(fields=['status']),
            models.Index(fields=['passed']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} - {self.quiz.title} (Tentativa {self.attempt_number})"
    
    def calculate_score(self):
        """Calcula a pontuação baseada nas respostas"""
        if self.total_questions > 0:
            self.score = (self.correct_answers / self.total_questions) * 100
            self.passed = self.score >= self.quiz.passing_score
        else:
            self.score = 0
            self.passed = False
        self.save()


class QuestionAnswer(models.Model):
    """
    Respostas dos usuários para perguntas específicas
    """
    quiz_attempt = models.ForeignKey(
        QuizAttempt,
        on_delete=models.CASCADE,
        related_name='answers',
        verbose_name='Tentativa de quiz'
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        verbose_name='Pergunta'
    )
    selected_answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name='Resposta selecionada'
    )
    user_text_answer = models.TextField(
        blank=True,
        verbose_name='Resposta em texto'
    )
    is_correct = models.BooleanField(null=True, blank=True, verbose_name='Resposta correta')
    points_earned = models.PositiveIntegerField(default=0, verbose_name='Pontos obtidos')
    time_spent_seconds = models.PositiveIntegerField(default=0, verbose_name='Tempo gasto (segundos)')
    answered_at = models.DateTimeField(auto_now_add=True, verbose_name='Respondido em')
    
    class Meta:
        verbose_name = 'Resposta da Pergunta'
        verbose_name_plural = 'Respostas das Perguntas'
        db_table = 'question_answers'
        unique_together = ['quiz_attempt', 'question']
        indexes = [
            models.Index(fields=['quiz_attempt']),
            models.Index(fields=['question']),
            models.Index(fields=['is_correct']),
        ]
    
    def __str__(self):
        return f"Resposta de {self.quiz_attempt.user.full_name} para {self.question}"


class UserAchievement(models.Model):
    """
    Conquistas obtidas pelos usuários
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='achievements',
        verbose_name='Usuário'
    )
    achievement = models.ForeignKey(
        Achievement,
        on_delete=models.CASCADE,
        related_name='user_achievements',
        verbose_name='Conquista'
    )
    earned_at = models.DateTimeField(auto_now_add=True, verbose_name='Obtido em')
    progress_data = models.JSONField(
        default=dict,
        help_text='Dados específicos do progresso para esta conquista',
        verbose_name='Dados do progresso'
    )
    notified = models.BooleanField(default=False, verbose_name='Notificado')
    
    class Meta:
        verbose_name = 'Conquista do Usuário'
        verbose_name_plural = 'Conquistas dos Usuários'
        db_table = 'user_achievements'
        unique_together = ['user', 'achievement']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['earned_at']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} - {self.achievement.name}"


class StudyStreak(models.Model):
    """
    Sequência de estudos diários dos usuários
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='study_streak',
        verbose_name='Usuário'
    )
    current_streak = models.PositiveIntegerField(default=0, verbose_name='Sequência atual')
    longest_streak = models.PositiveIntegerField(default=0, verbose_name='Maior sequência')
    last_activity_date = models.DateField(null=True, blank=True, verbose_name='Última atividade')
    total_study_days = models.PositiveIntegerField(default=0, verbose_name='Total de dias estudados')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Sequência de Estudos'
        verbose_name_plural = 'Sequências de Estudos'
        db_table = 'study_streaks'
    
    def __str__(self):
        return f"{self.user.full_name} - Sequência: {self.current_streak} dias"
    
    def update_streak(self):
        """Atualiza a sequência baseada na atividade de hoje"""
        from django.utils import timezone
        today = timezone.now().date()
        
        if self.last_activity_date:
            days_diff = (today - self.last_activity_date).days
            
            if days_diff == 1:
                # Continuou a sequência
                self.current_streak += 1
                if self.current_streak > self.longest_streak:
                    self.longest_streak = self.current_streak
            elif days_diff > 1:
                # Quebrou a sequência
                self.current_streak = 1
            # Se days_diff == 0, já estudou hoje, não altera
        else:
            # Primeira atividade
            self.current_streak = 1
            self.longest_streak = 1
        
        self.last_activity_date = today
        self.total_study_days += 1
        self.save()


class DailyGoal(models.Model):
    """
    Metas diárias dos usuários
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='daily_goals',
        verbose_name='Usuário'
    )
    date = models.DateField(verbose_name='Data')
    goal_minutes = models.PositiveIntegerField(verbose_name='Meta (minutos)')
    completed_minutes = models.PositiveIntegerField(default=0, verbose_name='Minutos completados')
    lessons_goal = models.PositiveIntegerField(default=1, verbose_name='Meta de lições')
    lessons_completed = models.PositiveIntegerField(default=0, verbose_name='Lições completadas')
    achieved = models.BooleanField(default=False, verbose_name='Meta alcançada')
    bonus_points = models.PositiveIntegerField(default=0, verbose_name='Pontos bônus')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Meta Diária'
        verbose_name_plural = 'Metas Diárias'
        db_table = 'daily_goals'
        unique_together = ['user', 'date']
        indexes = [
            models.Index(fields=['user', 'date']),
            models.Index(fields=['achieved']),
        ]
    
    def __str__(self):
        return f"{self.user.full_name} - {self.date} ({'✓' if self.achieved else '✗'})"
    
    def check_achievement(self):
        """Verifica se a meta foi alcançada"""
        time_achieved = self.completed_minutes >= self.goal_minutes
        lessons_achieved = self.lessons_completed >= self.lessons_goal
        
        if time_achieved and lessons_achieved and not self.achieved:
            self.achieved = True
            self.bonus_points = 50  # Pontos bônus por alcançar a meta
            self.save()
            
            # Atualiza a sequência de estudos
            streak, _ = StudyStreak.objects.get_or_create(user=self.user)
            streak.update_streak()
            
            return True
        return False