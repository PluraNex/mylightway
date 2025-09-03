import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen,
  CheckCircle,
  Play,
  Volume2,
  Award,
  Clock,
  Star,
  ArrowLeft,
  Target,
  Heart,
  Users,
  Lightbulb,
  Eye,
  RefreshCw,
  FileText,
  Video,
  CheckSquare,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const LearningPath = () => {
  const { pathId } = useParams();
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  // Mock data - em uma aplicação real, isso viria de uma API
  const pathData = {
    id: 'obediencia',
    title: 'Obediência',
    description:
      'Descubra a alegria de obedecer a Deus e aos pais através de histórias bíblicas inspiradoras.',
    detailedDescription:
      'Esta trilha ensina às crianças o valor fundamental da obediência através de exemplos bíblicos inspiradores. Exploramos como a obediência não é apenas uma regra, mas um ato de amor e confiança em Deus e nos pais.',
    icon: <Heart className="h-8 w-8" />,
    color: 'bg-gradient-accent',
    progress: 100,
    completedLessons: 5,
    totalLessons: 5,
    estimatedTime: '2-3 horas',
    ageGroup: '6-10 anos',
    difficulty: 'Iniciante',
    prerequisites: ['Nenhum pré-requisito'],
    coreValues: ['Obediência', 'Respeito', 'Amor filial', 'Confiança em Deus'],
    learningObjectives: [
      'Compreender o significado bíblico da obediência',
      'Identificar exemplos de obediência nas Escrituras',
      'Aplicar a obediência na vida diária',
      'Desenvolver amor e respeito pelos pais',
    ],
    keyVerses: [
      {
        reference: 'Efésios 6:1',
        text: 'Filhos, obedeçam a seus pais no Senhor, pois isso é justo.',
      },
      {
        reference: 'Colossenses 3:20',
        text: 'Filhos, obedeçam a seus pais em tudo, pois isso agrada ao Senhor.',
      },
    ],
    tags: [
      {
        name: 'Treinamento Parental',
        color: 'bg-primary/10 text-primary border-primary/20',
      },
      {
        name: 'Educação Cristã',
        color: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
      },
      {
        name: 'Formação Espiritual',
        color: 'bg-accent/10 text-accent-foreground border-accent/20',
      },
      {
        name: 'Disciplina Bíblica',
        color: 'bg-muted text-muted-foreground border-muted-foreground/20',
      },
    ],
    additionalResources: [
      {
        type: 'Livro',
        title: 'Histórias de Obediência',
        description: 'Coletânea de histórias bíblicas',
      },
      {
        type: 'Música',
        title: 'Obedecer é Melhor',
        description: 'Canção temática para crianças',
      },
      {
        type: 'Atividade',
        title: 'Jogo da Obediência',
        description: 'Jogo interativo sobre o tema',
      },
    ],
  };

  const lessons = [
    {
      id: 1,
      title: 'O que é Obediência?',
      type: 'video',
      duration: '8 min',
      completed: true,
      description:
        'Aprenda o significado bíblico da obediência e por que ela é importante.',
      verse: 'Efésios 6:1',
      activities: ['Vídeo explicativo', 'Quiz interativo'],
      detailedContent: {
        overview:
          'Esta lição introduz o conceito fundamental da obediência na perspectiva cristã, explorando seu significado bíblico e importância na vida familiar.',
        teachingTips: [
          'Use exemplos práticos do dia a dia',
          'Conecte com experiências da criança',
          'Enfatize o amor por trás da obediência',
        ],
        materials: ['Bíblia', 'Quadro ou papel', 'Marcadores coloridos'],
        keyPoints: [
          'Obediência é um ato de amor e confiança',
          'Deus nos ensina através dos pais',
          'Obedecer traz alegria e proteção',
        ],
        questions: [
          'Por que é importante obedecer aos pais?',
          'Como podemos mostrar amor através da obediência?',
          'Que bênçãos vêm da obediência?',
        ],
      },
    },
    {
      id: 2,
      title: 'A História de Samuel',
      type: 'story',
      duration: '12 min',
      completed: true,
      description: 'Como o jovem Samuel obedeceu ao chamado de Deus.',
      verse: '1 Samuel 3:10',
      activities: ['Guia para pais', 'Plano de ensino', 'Dicas práticas'],
      detailedContent: {
        overview:
          'Explore a história inspiradora do jovem Samuel e como sua obediência imediata ao chamado de Deus serve como exemplo para as crianças.',
        teachingTips: [
          'Dramatize a história para torná-la vívida',
          'Destaque a idade jovem de Samuel',
          'Relacione com situações familiares',
        ],
        materials: [
          'Bíblia ilustrada',
          'Figurinos simples',
          'Material para desenho',
        ],
        keyPoints: [
          'Samuel obedeceu prontamente',
          'Não questionou, apenas seguiu',
          'Sua obediência trouxe grandes frutos',
        ],
        questions: [
          'Como Samuel mostrou obediência?',
          'O que podemos aprender com ele?',
          'Como aplicar isso em casa?',
        ],
      },
    },
    {
      id: 3,
      title: 'Jesus e a Obediência',
      type: 'lesson',
      duration: '10 min',
      completed: true,
      description: 'O exemplo perfeito de obediência de Jesus ao Pai.',
      verse: 'Filipenses 2:8',
      activities: ['Leitura bíblica', 'Reflexão guiada'],
      detailedContent: {
        overview:
          'Jesus é o exemplo perfeito de obediência ao Pai celestial. Esta lição ensina como seguir Seu exemplo na obediência diária.',
        teachingTips: [
          'Mostre como Jesus sempre obedeceu',
          'Conecte com o amor de Jesus pelos pais',
          'Use parábolas simples',
        ],
        materials: ['Bíblia', 'Imagens de Jesus', 'Papel para desenho'],
        keyPoints: [
          'Jesus obedeceu até a cruz',
          'Sua obediência salvou a humanidade',
          'Podemos seguir Seu exemplo',
        ],
        questions: [
          'Como Jesus mostrou obediência?',
          'Por que Ele obedeceu ao Pai?',
          'Como podemos ser como Jesus?',
        ],
      },
    },
    {
      id: 4,
      title: 'Atividade Prática: Ajudando em Casa',
      type: 'activity',
      duration: '15 min',
      completed: true,
      description:
        'Pratique a obediência ajudando seus pais nas tarefas diárias.',
      verse: 'Colossenses 3:20',
      activities: ['Desafio prático', 'Registro fotográfico'],
      detailedContent: {
        overview:
          'Atividade prática para aplicar os ensinamentos sobre obediência no ambiente familiar, fortalecendo vínculos e valores.',
        teachingTips: [
          'Defina tarefas adequadas à idade',
          'Celebre pequenas vitórias',
          'Seja paciente e encorajador',
        ],
        materials: [
          'Lista de tarefas',
          'Adesivos de recompensa',
          'Câmera/celular',
        ],
        keyPoints: [
          'Obediência se demonstra nas ações',
          'Pequenos gestos têm grande valor',
          'A prática fortalece o caráter',
        ],
        questions: [
          'Que tarefas posso fazer para ajudar?',
          'Como me senti ajudando?',
          'O que aprendi sobre obediência?',
        ],
      },
    },
    {
      id: 5,
      title: 'Quiz Final e Badge',
      type: 'quiz',
      duration: '5 min',
      completed: true,
      description:
        'Teste seus conhecimentos e conquiste sua badge de obediência.',
      activities: ['Quiz de 10 perguntas', 'Conquista de badge'],
      detailedContent: {
        overview:
          'Avaliação final para consolidar os aprendizados sobre obediência e conquistar a badge especial da trilha.',
        teachingTips: [
          'Revise todos os pontos principais',
          'Celebre o progresso da criança',
          'Prepare a cerimônia da badge',
        ],
        materials: [
          'Questionário impresso',
          'Badge física (opcional)',
          'Certificado',
        ],
        keyPoints: [
          'Revisão de todos os conceitos',
          'Aplicação prática dos ensinamentos',
          'Celebração do aprendizado',
        ],
        questions: [
          'O que significa obediência?',
          'Quem foram nossos exemplos?',
          'Como vou praticar a obediência?',
        ],
      },
    },
  ];

  const badges = [
    {
      name: 'Coração Obediente',
      description: 'Completou toda a trilha de Obediência',
      icon: <Heart className="h-6 w-6" />,
      earned: true,
    },
    {
      name: 'Jovem Samuel',
      description: 'Aprendeu sobre a obediência de Samuel',
      icon: <Star className="h-6 w-6" />,
      earned: true,
    },
    {
      name: 'Seguidor de Jesus',
      description: 'Entendeu o exemplo de Jesus',
      icon: <Award className="h-6 w-6" />,
      earned: true,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'story':
        return <BookOpen className="h-4 w-4" />;
      case 'lesson':
        return <Lightbulb className="h-4 w-4" />;
      case 'activity':
        return <Target className="h-4 w-4" />;
      case 'quiz':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-gradient-primary';
      case 'story':
        return 'bg-gradient-accent';
      case 'lesson':
        return 'bg-gradient-success';
      case 'activity':
        return 'bg-gradient-primary';
      case 'quiz':
        return 'bg-gradient-accent';
      default:
        return 'bg-gradient-primary';
    }
  };

  const handleReview = (lesson: any) => {
    toast({
      title: 'Revisando Lição',
      description: `Iniciando revisão: ${lesson.title}`,
    });
    // Aqui você pode implementar a lógica de revisão
  };

  const handleViewDetails = (lesson: any) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/trilhas"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Trilhas
          </Link>
        </div>

        {/* Header da Trilha */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6">
              <div
                className={`h-20 w-20 rounded-2xl ${pathData.color} flex flex-shrink-0 items-center justify-center text-white shadow-badge`}
              >
                {pathData.icon}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center space-x-3">
                  <h1 className="text-3xl font-bold">{pathData.title}</h1>
                  <Badge className="bg-gradient-success text-success-foreground">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Concluída
                  </Badge>
                </div>

                <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {pathData.description}
                </p>

                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      Progresso
                    </div>
                    <div className="text-lg font-semibold">
                      {pathData.progress}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Lições</div>
                    <div className="text-lg font-semibold">
                      {pathData.completedLessons}/{pathData.totalLessons}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Duração</div>
                    <div className="text-lg font-semibold">
                      {pathData.estimatedTime}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Idade</div>
                    <div className="text-lg font-semibold">
                      {pathData.ageGroup}
                    </div>
                  </div>
                </div>

                {/* Tags Temáticas */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {pathData.tags.map((tag, index) => (
                      <Badge key={index} className={tag.color}>
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Valores Centrais */}
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    Valores Cristãos:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pathData.coreValues.map((value, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Heart className="mr-1 h-3 w-3" />
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progresso Visual */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="relative mx-auto h-24 w-24">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-success">
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">
                      {pathData.progress}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Trilha Completa!
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-primary">
                    <Award className="mr-2 h-4 w-4" />
                    Ver Certificado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detalhes Expandidos */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Objetivos de Aprendizado</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {pathData.learningObjectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Versículos Principais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pathData.keyVerses.map((verse, index) => (
                <div
                  key={index}
                  className="rounded-lg border-l-4 border-primary bg-muted/50 p-3"
                >
                  <p className="mb-1 text-sm font-medium text-primary">
                    {verse.reference}
                  </p>
                  <p className="text-sm italic leading-relaxed">
                    "{verse.text}"
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Lições */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Lições da Trilha</span>
                </CardTitle>
                <CardDescription>
                  Complete todas as lições para conquistar suas badges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <Card
                    key={lesson.id}
                    className={`${lesson.completed ? 'border-success/20 bg-muted/20' : 'hover:shadow-card'} transition-all`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                            {index + 1}
                          </div>
                          {lesson.completed ? (
                            <CheckCircle className="h-6 w-6 text-success" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30"></div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`h-8 w-8 rounded-lg ${getTypeColor(lesson.type)} flex items-center justify-center text-white`}
                              >
                                {getTypeIcon(lesson.type)}
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>

                          <p className="mb-3 text-sm text-muted-foreground">
                            {lesson.description}
                          </p>

                          {lesson.verse && (
                            <div className="mb-3 flex items-center space-x-2">
                              <BookOpen className="h-3 w-3 text-primary" />
                              <span className="text-xs font-medium text-primary">
                                {lesson.verse}
                              </span>
                            </div>
                          )}

                          <div className="mb-3 flex flex-wrap gap-2">
                            {lesson.activities.map((activity, actIndex) => (
                              <Badge
                                key={actIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {activity}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/licao/${lesson.id}`}>
                              <Button
                                size="sm"
                                variant={
                                  lesson.completed ? 'outline' : 'default'
                                }
                                className="flex-1"
                              >
                                <RefreshCw className="mr-1 h-3 w-3" />
                                {lesson.completed ? 'Revisar' : 'Iniciar'}
                              </Button>
                            </Link>
                            {lesson.completed && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => handleViewDetails(lesson)}
                                  className="flex-1"
                                >
                                  <Eye className="mr-1 h-3 w-3" />
                                  Detalhes
                                </Button>
                                <Link to={`/licao/${lesson.id}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="px-2"
                                  >
                                    <Play className="h-3 w-3" />
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Badges e Info */}
          <div className="space-y-6">
            {/* Badges Conquistadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Badges Conquistadas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 rounded-lg p-3 ${badge.earned ? 'bg-gradient-success/10 border border-success/20' : 'bg-muted/20'}`}
                  >
                    <div
                      className={`h-10 w-10 rounded-lg ${badge.earned ? 'bg-gradient-success' : 'bg-muted'} flex items-center justify-center text-white`}
                    >
                      {badge.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-success" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Lightbulb className="h-4 w-4" />
                  <span>Detalhes da Trilha</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-xs font-medium">DIFICULDADE</h4>
                  <Badge variant="secondary">{pathData.difficulty}</Badge>
                </div>

                <div>
                  <h4 className="mb-2 text-xs font-medium">PRÉ-REQUISITOS</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {pathData.prerequisites.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-xs font-medium">SOBRE A TRILHA</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {pathData.detailedDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recursos Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>Recursos Extras</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pathData.additionalResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-medium">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Dica para Pais */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Dica para os Pais</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Converse com sua filha sobre os momentos em que ela praticou
                  obediência. Celebrem juntos as conquistas e reflitam sobre
                  como a obediência traz alegria a Deus.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <BookOpen className="mr-2 h-3 w-3" />
                  Mais Dicas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Detalhes da Lição */}
        <Dialog
          open={!!selectedLesson}
          onOpenChange={() => setSelectedLesson(null)}
        >
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
            {selectedLesson && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg ${getTypeColor(selectedLesson.type)} flex items-center justify-center text-white`}
                    >
                      {getTypeIcon(selectedLesson.type)}
                    </div>
                    <div>
                      <h2 className="text-xl">{selectedLesson.title}</h2>
                      <p className="text-sm font-normal text-muted-foreground">
                        {selectedLesson.duration} • {selectedLesson.verse}
                      </p>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedLesson.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Visão Geral */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <FileText className="h-5 w-5" />
                        <span>Visão Geral</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">
                        {selectedLesson.detailedContent?.overview}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Pontos Principais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Target className="h-5 w-5" />
                        <span>Pontos Principais</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedLesson.detailedContent?.keyPoints?.map(
                          (point: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                              <span>{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Dicas de Ensino */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Lightbulb className="h-5 w-5" />
                        <span>Dicas de Ensino</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedLesson.detailedContent?.teachingTips?.map(
                          (tip: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              <span>{tip}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Materiais Necessários */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <CheckSquare className="h-5 w-5" />
                        <span>Materiais</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.detailedContent?.materials?.map(
                          (material: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {material}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Perguntas para Reflexão */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Perguntas para Reflexão</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {selectedLesson.detailedContent?.questions?.map(
                        (question: string, index: number) => (
                          <div
                            key={index}
                            className="rounded-lg bg-muted/50 p-3"
                          >
                            <p className="mb-1 text-sm font-medium text-primary">
                              Pergunta {index + 1}
                            </p>
                            <p className="text-sm">{question}</p>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Ações do Modal */}
                <div className="mt-6 flex justify-end space-x-3 border-t pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedLesson(null)}
                  >
                    Fechar
                  </Button>
                  <Button
                    onClick={() => {
                      handleReview(selectedLesson);
                      setSelectedLesson(null);
                    }}
                    className="bg-gradient-primary"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Iniciar Revisão
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LearningPath;
