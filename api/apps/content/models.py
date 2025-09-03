from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
import uuid

User = get_user_model()


class BibleBook(models.Model):
    """
    Livros da Bíblia
    """
    TESTAMENT_CHOICES = [
        ('old', 'Antigo Testamento'),
        ('new', 'Novo Testamento'),
    ]
    
    name = models.CharField(max_length=50, unique=True, verbose_name='Nome')
    abbreviation = models.CharField(max_length=10, unique=True, verbose_name='Abreviação')
    testament = models.CharField(
        max_length=3,
        choices=TESTAMENT_CHOICES,
        verbose_name='Testamento'
    )
    order = models.PositiveIntegerField(unique=True, verbose_name='Ordem')
    chapters_count = models.PositiveIntegerField(verbose_name='Número de capítulos')
    
    class Meta:
        verbose_name = 'Livro Bíblico'
        verbose_name_plural = 'Livros Bíblicos'
        db_table = 'bible_books'
        ordering = ['order']
    
    def __str__(self):
        return self.name


class BibleVerse(models.Model):
    """
    Versículos bíblicos
    """
    book = models.ForeignKey(
        BibleBook,
        on_delete=models.CASCADE,
        related_name='verses',
        verbose_name='Livro'
    )
    chapter = models.PositiveIntegerField(verbose_name='Capítulo')
    verse = models.PositiveIntegerField(verbose_name='Versículo')
    text = models.TextField(verbose_name='Texto')
    version = models.CharField(
        max_length=10,
        default='NVI',
        verbose_name='Versão'
    )
    
    class Meta:
        verbose_name = 'Versículo Bíblico'
        verbose_name_plural = 'Versículos Bíblicos'
        db_table = 'bible_verses'
        unique_together = ['book', 'chapter', 'verse', 'version']
        indexes = [
            models.Index(fields=['book', 'chapter']),
            models.Index(fields=['version']),
        ]
    
    def __str__(self):
        return f"{self.book.abbreviation} {self.chapter}:{self.verse}"
    
    @property
    def reference(self):
        return f"{self.book.name} {self.chapter}:{self.verse}"


class Story(models.Model):
    """
    Histórias bíblicas adaptadas para crianças
    """
    AGE_GROUPS = [
        ('3-5', '3-5 anos'),
        ('6-8', '6-8 anos'),
        ('9-11', '9-11 anos'),
        ('12-14', '12-14 anos'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug')
    summary = models.TextField(verbose_name='Resumo')
    content = models.TextField(verbose_name='Conteúdo')
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUPS,
        verbose_name='Faixa etária'
    )
    moral_lesson = models.TextField(
        verbose_name='Lição moral'
    )
    cover_image = models.ImageField(
        upload_to='stories/',
        null=True,
        blank=True,
        verbose_name='Imagem de capa'
    )
    bible_references = models.ManyToManyField(
        BibleVerse,
        blank=True,
        verbose_name='Referências bíblicas'
    )
    tags = models.CharField(
        max_length=500,
        blank=True,
        help_text='Tags separadas por vírgula',
        verbose_name='Tags'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Destacada')
    is_published = models.BooleanField(default=False, verbose_name='Publicada')
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_stories',
        verbose_name='Criado por'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'História'
        verbose_name_plural = 'Histórias'
        db_table = 'stories'
        ordering = ['-created_at']
        indexes = [
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


class Prayer(models.Model):
    """
    Orações para diferentes ocasiões
    """
    PRAYER_TYPES = [
        ('morning', 'Oração da Manhã'),
        ('evening', 'Oração da Noite'),
        ('meal', 'Oração da Refeição'),
        ('gratitude', 'Gratidão'),
        ('protection', 'Proteção'),
        ('healing', 'Cura'),
        ('family', 'Família'),
        ('friends', 'Amigos'),
        ('school', 'Escola'),
        ('special', 'Ocasião Especial'),
    ]
    
    AGE_GROUPS = [
        ('3-5', '3-5 anos'),
        ('6-8', '6-8 anos'),
        ('9-11', '9-11 anos'),
        ('12-14', '12-14 anos'),
        ('all', 'Todas as idades'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, verbose_name='Título')
    prayer_type = models.CharField(
        max_length=20,
        choices=PRAYER_TYPES,
        verbose_name='Tipo de oração'
    )
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUPS,
        default='all',
        verbose_name='Faixa etária'
    )
    text = models.TextField(verbose_name='Texto da oração')
    audio_file = models.FileField(
        upload_to='prayers/audio/',
        null=True,
        blank=True,
        verbose_name='Arquivo de áudio'
    )
    is_favorite = models.BooleanField(default=False, verbose_name='Favorita')
    is_published = models.BooleanField(default=True, verbose_name='Publicada')
    usage_count = models.PositiveIntegerField(default=0, verbose_name='Contagem de uso')
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_prayers',
        verbose_name='Criado por'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Oração'
        verbose_name_plural = 'Orações'
        db_table = 'prayers'
        ordering = ['prayer_type', 'title']
        indexes = [
            models.Index(fields=['prayer_type']),
            models.Index(fields=['age_group']),
            models.Index(fields=['is_published']),
        ]
    
    def __str__(self):
        return self.title


class Song(models.Model):
    """
    Cânticos e hinos infantis
    """
    SONG_TYPES = [
        ('worship', 'Adoração'),
        ('praise', 'Louvor'),
        ('teaching', 'Ensino'),
        ('action', 'Ação/Movimento'),
        ('lullaby', 'Canção de Ninar'),
    ]
    
    AGE_GROUPS = [
        ('3-5', '3-5 anos'),
        ('6-8', '6-8 anos'),
        ('9-11', '9-11 anos'),
        ('12-14', '12-14 anos'),
        ('all', 'Todas as idades'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug')
    artist = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Artista/Compositor'
    )
    song_type = models.CharField(
        max_length=20,
        choices=SONG_TYPES,
        verbose_name='Tipo de cântico'
    )
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUPS,
        default='all',
        verbose_name='Faixa etária'
    )
    lyrics = models.TextField(verbose_name='Letra')
    audio_file = models.FileField(
        upload_to='songs/audio/',
        null=True,
        blank=True,
        verbose_name='Arquivo de áudio'
    )
    sheet_music = models.FileField(
        upload_to='songs/sheets/',
        null=True,
        blank=True,
        verbose_name='Partitura'
    )
    video_url = models.URLField(blank=True, verbose_name='URL do vídeo')
    chord_chart = models.TextField(
        blank=True,
        verbose_name='Cifra'
    )
    teaching_notes = models.TextField(
        blank=True,
        verbose_name='Notas para ensino'
    )
    bible_references = models.ManyToManyField(
        BibleVerse,
        blank=True,
        verbose_name='Referências bíblicas'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Destacado')
    is_published = models.BooleanField(default=True, verbose_name='Publicado')
    play_count = models.PositiveIntegerField(default=0, verbose_name='Contagem de reprodução')
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_songs',
        verbose_name='Criado por'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Cântico'
        verbose_name_plural = 'Cânticos'
        db_table = 'songs'
        ordering = ['song_type', 'title']
        indexes = [
            models.Index(fields=['song_type']),
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


class Activity(models.Model):
    """
    Atividades práticas e exercícios
    """
    ACTIVITY_TYPES = [
        ('craft', 'Artesanato'),
        ('coloring', 'Colorir'),
        ('drawing', 'Desenho'),
        ('game', 'Jogo'),
        ('puzzle', 'Quebra-cabeça'),
        ('memory', 'Jogo da Memória'),
        ('writing', 'Escrita'),
        ('discussion', 'Discussão'),
    ]
    
    DIFFICULTY_LEVELS = [
        ('easy', 'Fácil'),
        ('medium', 'Médio'),
        ('hard', 'Difícil'),
    ]
    
    AGE_GROUPS = [
        ('3-5', '3-5 anos'),
        ('6-8', '6-8 anos'),
        ('9-11', '9-11 anos'),
        ('12-14', '12-14 anos'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, verbose_name='Título')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug')
    description = models.TextField(verbose_name='Descrição')
    activity_type = models.CharField(
        max_length=20,
        choices=ACTIVITY_TYPES,
        verbose_name='Tipo de atividade'
    )
    difficulty_level = models.CharField(
        max_length=10,
        choices=DIFFICULTY_LEVELS,
        default='medium',
        verbose_name='Nível de dificuldade'
    )
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUPS,
        verbose_name='Faixa etária'
    )
    instructions = models.TextField(verbose_name='Instruções')
    materials_needed = models.JSONField(
        default=list,
        help_text='Lista de materiais necessários',
        verbose_name='Materiais necessários'
    )
    estimated_time_minutes = models.PositiveIntegerField(
        verbose_name='Tempo estimado (minutos)'
    )
    learning_objectives = models.JSONField(
        default=list,
        help_text='Lista de objetivos de aprendizado',
        verbose_name='Objetivos de aprendizado'
    )
    cover_image = models.ImageField(
        upload_to='activities/',
        null=True,
        blank=True,
        verbose_name='Imagem de capa'
    )
    instruction_video = models.URLField(
        blank=True,
        verbose_name='URL do vídeo de instruções'
    )
    template_file = models.FileField(
        upload_to='activities/templates/',
        null=True,
        blank=True,
        verbose_name='Arquivo template'
    )
    bible_connection = models.TextField(
        blank=True,
        verbose_name='Conexão bíblica'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Destacada')
    is_published = models.BooleanField(default=True, verbose_name='Publicada')
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_activities',
        verbose_name='Criado por'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Atividade'
        verbose_name_plural = 'Atividades'
        db_table = 'activities'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['activity_type']),
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