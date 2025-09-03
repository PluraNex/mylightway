from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    """
    Modelo customizado de usuário para o MyLightWay
    """
    USER_TYPES = [
        ('child', 'Criança'),
        ('parent', 'Responsável'),
        ('admin', 'Administrador'),
    ]
    
    email = models.EmailField(_('email address'), unique=True)
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPES,
        default='child',
        verbose_name='Tipo de usuário'
    )
    birth_date = models.DateField(null=True, blank=True, verbose_name='Data de nascimento')
    avatar = models.ImageField(
        upload_to='avatars/',
        null=True,
        blank=True,
        verbose_name='Avatar'
    )
    is_active = models.BooleanField(default=True, verbose_name='Ativo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
        db_table = 'users'
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}" if self.first_name else self.email
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    @property
    def is_child(self):
        return self.user_type == 'child'
    
    @property
    def is_parent(self):
        return self.user_type == 'parent'
    
    @property
    def is_admin(self):
        return self.user_type == 'admin'


class Profile(models.Model):
    """
    Perfil estendido do usuário
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='Usuário'
    )
    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True,
        verbose_name='Telefone'
    )
    bio = models.TextField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name='Biografia'
    )
    favorite_verse = models.TextField(
        null=True,
        blank=True,
        verbose_name='Versículo favorito'
    )
    denomination = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name='Denominação'
    )
    church_name = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='Nome da igreja'
    )
    preferred_language = models.CharField(
        max_length=5,
        default='pt-br',
        verbose_name='Idioma preferido'
    )
    timezone = models.CharField(
        max_length=50,
        default='America/Sao_Paulo',
        verbose_name='Fuso horário'
    )
    notifications_enabled = models.BooleanField(
        default=True,
        verbose_name='Notificações habilitadas'
    )
    email_notifications = models.BooleanField(
        default=True,
        verbose_name='Notificações por email'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Perfil'
        verbose_name_plural = 'Perfis'
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"Perfil de {self.user.full_name or self.user.email}"


class ParentChildRelationship(models.Model):
    """
    Relacionamento entre pais/responsáveis e crianças
    """
    RELATIONSHIP_TYPES = [
        ('parent', 'Pai/Mãe'),
        ('guardian', 'Responsável'),
        ('grandparent', 'Avô/Avó'),
        ('teacher', 'Professor'),
        ('other', 'Outro'),
    ]
    
    parent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='children_relationships',
        limit_choices_to={'user_type__in': ['parent', 'admin']},
        verbose_name='Responsável'
    )
    child = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='parent_relationships',
        limit_choices_to={'user_type': 'child'},
        verbose_name='Criança'
    )
    relationship_type = models.CharField(
        max_length=20,
        choices=RELATIONSHIP_TYPES,
        default='parent',
        verbose_name='Tipo de relacionamento'
    )
    can_monitor_progress = models.BooleanField(
        default=True,
        verbose_name='Pode monitorar progresso'
    )
    can_assign_activities = models.BooleanField(
        default=True,
        verbose_name='Pode atribuir atividades'
    )
    can_modify_settings = models.BooleanField(
        default=False,
        verbose_name='Pode modificar configurações'
    )
    is_primary = models.BooleanField(
        default=False,
        verbose_name='Responsável principal'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    
    class Meta:
        verbose_name = 'Relacionamento Familiar'
        verbose_name_plural = 'Relacionamentos Familiares'
        db_table = 'parent_child_relationships'
        unique_together = ['parent', 'child']
        indexes = [
            models.Index(fields=['parent']),
            models.Index(fields=['child']),
            models.Index(fields=['is_primary']),
        ]
    
    def __str__(self):
        return f"{self.parent.full_name} - {self.child.full_name} ({self.get_relationship_type_display()})"


class UserSettings(models.Model):
    """
    Configurações personalizadas do usuário
    """
    DIFFICULTY_LEVELS = [
        ('easy', 'Fácil'),
        ('medium', 'Médio'),
        ('hard', 'Difícil'),
        ('auto', 'Automático'),
    ]
    
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='settings',
        verbose_name='Usuário'
    )
    preferred_difficulty = models.CharField(
        max_length=10,
        choices=DIFFICULTY_LEVELS,
        default='auto',
        verbose_name='Nível de dificuldade preferido'
    )
    daily_goal_minutes = models.PositiveIntegerField(
        default=15,
        validators=[MinValueValidator(5), MaxValueValidator(120)],
        verbose_name='Meta diária (minutos)'
    )
    reminder_time = models.TimeField(
        null=True,
        blank=True,
        verbose_name='Horário do lembrete'
    )
    weekend_reminders = models.BooleanField(
        default=False,
        verbose_name='Lembretes nos fins de semana'
    )
    sound_effects = models.BooleanField(
        default=True,
        verbose_name='Efeitos sonoros'
    )
    animations = models.BooleanField(
        default=True,
        verbose_name='Animações'
    )
    dark_mode = models.BooleanField(
        default=False,
        verbose_name='Modo escuro'
    )
    font_size = models.CharField(
        max_length=10,
        choices=[
            ('small', 'Pequena'),
            ('medium', 'Média'),
            ('large', 'Grande'),
        ],
        default='medium',
        verbose_name='Tamanho da fonte'
    )
    auto_play_videos = models.BooleanField(
        default=True,
        verbose_name='Reproduzir vídeos automaticamente'
    )
    show_hints = models.BooleanField(
        default=True,
        verbose_name='Mostrar dicas'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Configurações do Usuário'
        verbose_name_plural = 'Configurações dos Usuários'
        db_table = 'user_settings'
    
    def __str__(self):
        return f"Configurações de {self.user.full_name or self.user.email}"