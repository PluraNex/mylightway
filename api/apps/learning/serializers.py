from rest_framework import serializers
from .models import (
    Category, LearningPath, Lesson, Quiz, Question, Answer, Achievement
)


class CategorySerializer(serializers.ModelSerializer):
    learning_paths_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'icon', 'color',
            'order', 'is_active', 'learning_paths_count'
        ]
    
    def get_learning_paths_count(self, obj):
        return obj.learning_paths.filter(is_published=True).count()


class LearningPathListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    total_lessons = serializers.ReadOnlyField()
    progress_info = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningPath
        fields = [
            'id', 'title', 'slug', 'description', 'category',
            'difficulty_level', 'age_group', 'estimated_duration_minutes',
            'cover_image', 'is_featured', 'total_lessons', 'progress_info',
            'created_at'
        ]
    
    def get_progress_info(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import LearningPathProgress
            try:
                progress = LearningPathProgress.objects.get(
                    user=request.user,
                    learning_path=obj
                )
                return {
                    'status': progress.status,
                    'progress_percentage': progress.progress_percentage,
                    'current_lesson_id': progress.current_lesson.id if progress.current_lesson else None,
                    'started_at': progress.started_at,
                    'completed_at': progress.completed_at,
                    'favorite': progress.favorite
                }
            except LearningPathProgress.DoesNotExist:
                return {
                    'status': 'not_started',
                    'progress_percentage': 0,
                    'current_lesson_id': None,
                    'started_at': None,
                    'completed_at': None,
                    'favorite': False
                }
        return None


class LearningPathDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    lessons = serializers.SerializerMethodField()
    total_lessons = serializers.ReadOnlyField()
    progress_info = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningPath
        fields = [
            'id', 'title', 'slug', 'description', 'category',
            'difficulty_level', 'age_group', 'estimated_duration_minutes',
            'cover_image', 'is_featured', 'objectives', 'prerequisites',
            'tags', 'total_lessons', 'lessons', 'progress_info',
            'created_at', 'updated_at'
        ]
    
    def get_lessons(self, obj):
        lessons = obj.lessons.filter(is_published=True).order_by('order')
        return LessonListSerializer(lessons, many=True, context=self.context).data
    
    def get_progress_info(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import LearningPathProgress
            try:
                progress = LearningPathProgress.objects.get(
                    user=request.user,
                    learning_path=obj
                )
                return {
                    'status': progress.status,
                    'progress_percentage': progress.progress_percentage,
                    'current_lesson_id': progress.current_lesson.id if progress.current_lesson else None,
                    'total_time_spent_minutes': progress.total_time_spent_minutes,
                    'started_at': progress.started_at,
                    'completed_at': progress.completed_at,
                    'favorite': progress.favorite
                }
            except LearningPathProgress.DoesNotExist:
                return {
                    'status': 'not_started',
                    'progress_percentage': 0,
                    'current_lesson_id': None,
                    'total_time_spent_minutes': 0,
                    'started_at': None,
                    'completed_at': None,
                    'favorite': False
                }
        return None


class LessonListSerializer(serializers.ModelSerializer):
    progress_info = serializers.SerializerMethodField()
    has_quiz = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'description', 'lesson_type',
            'order', 'estimated_duration_minutes', 'thumbnail',
            'is_free', 'progress_info', 'has_quiz'
        ]
    
    def get_progress_info(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import LessonProgress
            try:
                progress = LessonProgress.objects.get(
                    user=request.user,
                    lesson=obj
                )
                return {
                    'status': progress.status,
                    'progress_percentage': progress.progress_percentage,
                    'score': progress.score,
                    'time_spent_minutes': progress.time_spent_minutes,
                    'completed_at': progress.completed_at
                }
            except LessonProgress.DoesNotExist:
                return {
                    'status': 'not_started',
                    'progress_percentage': 0,
                    'score': None,
                    'time_spent_minutes': 0,
                    'completed_at': None
                }
        return None
    
    def get_has_quiz(self, obj):
        return hasattr(obj, 'quiz')


class LessonDetailSerializer(serializers.ModelSerializer):
    learning_path = LearningPathListSerializer(read_only=True)
    progress_info = serializers.SerializerMethodField()
    quiz = serializers.SerializerMethodField()
    next_lesson = serializers.SerializerMethodField()
    previous_lesson = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'learning_path', 'title', 'slug', 'description',
            'lesson_type', 'content', 'video_url', 'audio_file',
            'thumbnail', 'order', 'estimated_duration_minutes',
            'bible_verses', 'key_concepts', 'is_free',
            'progress_info', 'quiz', 'next_lesson', 'previous_lesson',
            'created_at', 'updated_at'
        ]
    
    def get_progress_info(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import LessonProgress
            try:
                progress = LessonProgress.objects.get(
                    user=request.user,
                    lesson=obj
                )
                return {
                    'status': progress.status,
                    'progress_percentage': progress.progress_percentage,
                    'score': progress.score,
                    'time_spent_minutes': progress.time_spent_minutes,
                    'notes': progress.notes,
                    'started_at': progress.started_at,
                    'completed_at': progress.completed_at
                }
            except LessonProgress.DoesNotExist:
                return {
                    'status': 'not_started',
                    'progress_percentage': 0,
                    'score': None,
                    'time_spent_minutes': 0,
                    'notes': '',
                    'started_at': None,
                    'completed_at': None
                }
        return None
    
    def get_quiz(self, obj):
        if hasattr(obj, 'quiz'):
            return QuizSerializer(obj.quiz, context=self.context).data
        return None
    
    def get_next_lesson(self, obj):
        next_lesson = Lesson.objects.filter(
            learning_path=obj.learning_path,
            order__gt=obj.order,
            is_published=True
        ).order_by('order').first()
        
        if next_lesson:
            return {
                'id': next_lesson.id,
                'title': next_lesson.title,
                'slug': next_lesson.slug
            }
        return None
    
    def get_previous_lesson(self, obj):
        previous_lesson = Lesson.objects.filter(
            learning_path=obj.learning_path,
            order__lt=obj.order,
            is_published=True
        ).order_by('-order').first()
        
        if previous_lesson:
            return {
                'id': previous_lesson.id,
                'title': previous_lesson.title,
                'slug': previous_lesson.slug
            }
        return None


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text', 'order']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = [
            'id', 'question_text', 'question_type', 'explanation',
            'points', 'order', 'image', 'answers'
        ]


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    total_questions = serializers.ReadOnlyField()
    user_attempts = serializers.SerializerMethodField()
    
    class Meta:
        model = Quiz
        fields = [
            'id', 'title', 'description', 'passing_score',
            'max_attempts', 'time_limit_minutes', 'randomize_questions',
            'show_correct_answers', 'total_questions', 'questions',
            'user_attempts'
        ]
    
    def get_user_attempts(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import QuizAttempt
            attempts = QuizAttempt.objects.filter(
                user=request.user,
                quiz=obj
            ).order_by('-attempt_number')[:5]  # Últimas 5 tentativas
            
            return [{
                'id': attempt.id,
                'attempt_number': attempt.attempt_number,
                'status': attempt.status,
                'score': attempt.score,
                'passed': attempt.passed,
                'started_at': attempt.started_at,
                'completed_at': attempt.completed_at
            } for attempt in attempts]
        return []


class AchievementSerializer(serializers.ModelSerializer):
    earned_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'name', 'slug', 'description', 'achievement_type',
            'icon', 'badge_color', 'points', 'is_hidden',
            'earned_info'
        ]
    
    def get_earned_info(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.progress.models import UserAchievement
            try:
                user_achievement = UserAchievement.objects.get(
                    user=request.user,
                    achievement=obj
                )
                return {
                    'earned': True,
                    'earned_at': user_achievement.earned_at,
                    'progress_data': user_achievement.progress_data
                }
            except UserAchievement.DoesNotExist:
                return {
                    'earned': False,
                    'earned_at': None,
                    'progress_data': {}
                }
        return None