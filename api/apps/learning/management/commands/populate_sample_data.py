from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.learning.models import Category, LearningPath, Lesson, Quiz, Question, Answer, Achievement
from apps.accounts.models import Profile, UserSettings

User = get_user_model()


class Command(BaseCommand):
    """
    Comando para popular o banco com dados de exemplo para testar a API
    """
    help = 'Popula o banco com dados de exemplo para demonstração'

    def handle(self, *args, **options):
        self.stdout.write('🚀 Iniciando população de dados de exemplo...\n')

        # Criar usuários de exemplo
        self.create_sample_users()
        
        # Criar categorias
        self.create_categories()
        
        # Criar caminhos de aprendizado
        self.create_learning_paths()
        
        # Criar conquistas
        self.create_achievements()

        self.stdout.write(
            self.style.SUCCESS('\n✅ Dados de exemplo criados com sucesso!')
        )
        self.stdout.write(
            '🔗 Acesse a documentação em: http://localhost:8000/api/docs/'
        )

    def create_sample_users(self):
        self.stdout.write('👥 Criando usuários de exemplo...')
        
        # Admin
        if not User.objects.filter(email='admin@mylightway.com').exists():
            admin = User.objects.create_user(
                email='admin@mylightway.com',
                username='admin',
                password='admin123',
                first_name='Administrador',
                last_name='Sistema',
                user_type='admin',
                is_staff=True,
                is_superuser=True
            )
            Profile.objects.create(user=admin)
            UserSettings.objects.create(user=admin)
            self.stdout.write('   ✓ Admin criado: admin@mylightway.com / admin123')

        # Responsável
        if not User.objects.filter(email='joao@exemplo.com').exists():
            parent = User.objects.create_user(
                email='joao@exemplo.com',
                username='joao_silva',
                password='senha123',
                first_name='João',
                last_name='Silva',
                user_type='parent',
                birth_date='1985-08-22'
            )
            Profile.objects.create(
                user=parent,
                phone='(11) 99999-9999',
                denomination='Batista',
                church_name='Igreja Batista Central'
            )
            UserSettings.objects.create(user=parent)
            self.stdout.write('   ✓ Responsável criado: joao@exemplo.com / senha123')

        # Criança
        if not User.objects.filter(email='maria@exemplo.com').exists():
            child = User.objects.create_user(
                email='maria@exemplo.com',
                username='maria_silva',
                password='senha123',
                first_name='Maria',
                last_name='Silva',
                user_type='child',
                birth_date='2015-03-15'
            )
            Profile.objects.create(user=child)
            UserSettings.objects.create(
                user=child,
                preferred_difficulty='beginner',
                daily_goal_minutes=20
            )
            self.stdout.write('   ✓ Criança criada: maria@exemplo.com / senha123')

    def create_categories(self):
        self.stdout.write('📚 Criando categorias...')
        
        categories_data = [
            {
                'name': 'Histórias Bíblicas',
                'slug': 'historias-biblicas',
                'description': 'Histórias do Antigo e Novo Testamento adaptadas para crianças',
                'icon': 'book',
                'color': '#3b82f6',
                'order': 1
            },
            {
                'name': 'Valores Cristãos',
                'slug': 'valores-cristaos', 
                'description': 'Ensinamentos sobre amor, bondade, perdão e outros valores',
                'icon': 'heart',
                'color': '#ef4444',
                'order': 2
            },
            {
                'name': 'Oração e Adoração',
                'slug': 'oracao-adoracao',
                'description': 'Aprendendo a orar e adorar a Deus',
                'icon': 'hands-praying',
                'color': '#8b5cf6',
                'order': 3
            }
        ]

        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(f'   ✓ Categoria criada: {category.name}')

    def create_learning_paths(self):
        self.stdout.write('🛤️ Criando caminhos de aprendizado...')
        
        # Buscar categorias
        historia_cat = Category.objects.get(slug='historias-biblicas')
        valores_cat = Category.objects.get(slug='valores-cristaos')
        
        paths_data = [
            {
                'title': 'A História de Noé',
                'slug': 'historia-de-noe',
                'description': 'Aprenda sobre fé e obediência com a história da arca de Noé',
                'category': historia_cat,
                'difficulty_level': 'beginner',
                'age_group': '6-8',
                'estimated_duration_minutes': 25,
                'is_featured': True,
                'is_published': True,
                'tags': 'noé, arca, animais, obediência, fé',
                'objectives': [
                    'Entender a importância da obediência a Deus',
                    'Aprender sobre o cuidado de Deus com os animais',
                    'Reconhecer que Deus protege os justos'
                ]
            },
            {
                'title': 'Jesus e as Crianças',
                'slug': 'jesus-e-as-criancas',
                'description': 'Descubra como Jesus amava e abençoava as crianças',
                'category': historia_cat,
                'difficulty_level': 'beginner',
                'age_group': '3-5',
                'estimated_duration_minutes': 15,
                'is_featured': True,
                'is_published': True,
                'tags': 'jesus, crianças, amor, bênção',
                'objectives': [
                    'Saber que Jesus ama todas as crianças',
                    'Entender que podemos nos aproximar de Jesus',
                    'Sentir-se amado e aceito por Deus'
                ]
            },
            {
                'title': 'Aprendendo sobre Bondade',
                'slug': 'aprendendo-bondade',
                'description': 'Descobrindo como ser bondoso com os outros',
                'category': valores_cat,
                'difficulty_level': 'beginner',
                'age_group': '6-8',
                'estimated_duration_minutes': 20,
                'is_featured': False,
                'is_published': True,
                'tags': 'bondade, gentileza, amor ao próximo',
                'objectives': [
                    'Reconhecer atos de bondade',
                    'Praticar a bondade no dia a dia',
                    'Entender que Deus nos chama para ser bondosos'
                ]
            }
        ]

        for path_data in paths_data:
            path, created = LearningPath.objects.get_or_create(
                slug=path_data['slug'],
                defaults=path_data
            )
            if created:
                self.stdout.write(f'   ✓ Caminho criado: {path.title}')
                
                # Criar algumas lições para cada caminho
                self.create_sample_lessons(path)

    def create_sample_lessons(self, learning_path):
        """Criar lições de exemplo para um caminho"""
        
        if learning_path.slug == 'historia-de-noe':
            lessons_data = [
                {
                    'title': 'Deus Fala com Noé',
                    'slug': 'deus-fala-com-noe',
                    'description': 'Deus escolhe Noé para uma missão especial',
                    'lesson_type': 'video',
                    'content': 'Noé era um homem justo que amava a Deus...',
                    'order': 1,
                    'estimated_duration_minutes': 5,
                    'is_published': True
                },
                {
                    'title': 'Construindo a Arca',
                    'slug': 'construindo-arca',
                    'description': 'Noé obedece a Deus e constrói a grande arca',
                    'lesson_type': 'interactive',
                    'content': 'Deus deu instruções específicas para Noé...',
                    'order': 2,
                    'estimated_duration_minutes': 7,
                    'is_published': True
                }
            ]
        elif learning_path.slug == 'jesus-e-as-criancas':
            lessons_data = [
                {
                    'title': 'Jesus Recebe as Crianças',
                    'slug': 'jesus-recebe-criancas',
                    'description': 'Jesus convida as crianças para perto dele',
                    'lesson_type': 'text',
                    'content': 'Um dia, algumas mães trouxeram seus filhos para Jesus...',
                    'order': 1,
                    'estimated_duration_minutes': 3,
                    'is_published': True
                }
            ]
        else:
            lessons_data = [
                {
                    'title': 'O que é Bondade?',
                    'slug': 'o-que-e-bondade',
                    'description': 'Entendendo o significado de ser bondoso',
                    'lesson_type': 'text',
                    'content': 'Bondade é tratar os outros com amor e gentileza...',
                    'order': 1,
                    'estimated_duration_minutes': 4,
                    'is_published': True
                }
            ]

        for lesson_data in lessons_data:
            lesson_data['learning_path'] = learning_path
            lesson, created = Lesson.objects.get_or_create(
                learning_path=learning_path,
                slug=lesson_data['slug'],
                defaults=lesson_data
            )
            if created and lesson_data['lesson_type'] == 'quiz':
                self.create_sample_quiz(lesson)

    def create_sample_quiz(self, lesson):
        """Criar quiz de exemplo para uma lição"""
        quiz = Quiz.objects.create(
            lesson=lesson,
            title=f'Quiz: {lesson.title}',
            description='Teste seus conhecimentos sobre a lição',
            passing_score=70,
            max_attempts=3
        )

        # Pergunta de exemplo
        question = Question.objects.create(
            quiz=quiz,
            question_text='Qual foi a primeira coisa que Noé fez quando saiu da arca?',
            question_type='multiple_choice',
            points=10,
            order=1
        )

        # Respostas
        Answer.objects.create(
            question=question,
            answer_text='Construiu uma casa',
            is_correct=False,
            order=1
        )
        Answer.objects.create(
            question=question,
            answer_text='Ofereceu um sacrifício a Deus',
            is_correct=True,
            order=2
        )

    def create_achievements(self):
        self.stdout.write('🏆 Criando conquistas...')
        
        achievements_data = [
            {
                'name': 'Primeiro Passo',
                'slug': 'primeiro-passo',
                'description': 'Complete sua primeira lição',
                'achievement_type': 'progress',
                'icon': 'star',
                'badge_color': '#fbbf24',
                'points': 10,
                'requirements': {'lessons_completed': 1}
            },
            {
                'name': 'Estudante Dedicado',
                'slug': 'estudante-dedicado',
                'description': 'Estude por 7 dias consecutivos',
                'achievement_type': 'streak',
                'icon': 'fire',
                'badge_color': '#f97316',
                'points': 50,
                'requirements': {'streak_days': 7}
            },
            {
                'name': 'Mestre do Quiz',
                'slug': 'mestre-quiz',
                'description': 'Acerte 100% em um quiz',
                'achievement_type': 'quiz',
                'icon': 'trophy',
                'badge_color': '#eab308',
                'points': 25,
                'requirements': {'quiz_score': 100}
            }
        ]

        for ach_data in achievements_data:
            achievement, created = Achievement.objects.get_or_create(
                slug=ach_data['slug'],
                defaults=ach_data
            )
            if created:
                self.stdout.write(f'   ✓ Conquista criada: {achievement.name}')