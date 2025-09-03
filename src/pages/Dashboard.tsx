import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Trophy,
  Calendar,
  Star,
  TrendingUp,
  Heart,
  Target,
  Clock,
  Award,
  Flame,
  Lightbulb,
  Play,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const currentProgress = {
    totalXP: 1250,
    level: 3,
    nextLevelXP: 1500,
    completedPaths: 3,
    totalPaths: 11,
    currentStreak: 7,
    badges: 12,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'trilha_completa',
      title: 'Obediência Concluída!',
      description: 'Parabéns! Você conquistou todas as badges desta trilha.',
      time: '2 horas atrás',
      xp: '+150 XP',
      badge: 'Coração Obediente',
    },
    {
      id: 2,
      type: 'versiculo_memorizado',
      title: 'Versículo Memorizado',
      description: "Efésios 6:1 - 'Filhos, obedeçam a seus pais no Senhor'",
      time: '1 dia atrás',
      xp: '+50 XP',
    },
    {
      id: 3,
      type: 'atividade_pratica',
      title: 'Atividade Realizada',
      description: 'Ajudou os pais com as tarefas domésticas',
      time: '2 dias atrás',
      xp: '+75 XP',
    },
  ];

  const currentLessons = [
    {
      id: 2,
      title: 'A História de Samuel',
      pathTitle: 'Trilha da Obediência',
      progress: 65,
      timeLeft: '12 min restantes',
      type: 'story',
      lessonId: 'obediencia-samuel',
    },
    {
      id: 3,
      title: 'A Sabedoria de Salomão',
      pathTitle: 'Trilha da Prudência',
      progress: 25,
      timeLeft: '18 min restantes',
      type: 'lesson',
      lessonId: 'prudencia-salomao',
    },
    {
      id: 1,
      title: 'Amor ao Próximo',
      pathTitle: 'Trilha do Amor',
      progress: 80,
      timeLeft: '5 min restantes',
      type: 'activity',
      lessonId: 'amor-proximo',
    },
  ];

  const nextGoals = [
    {
      id: 1,
      title: 'Complete a trilha Prudência',
      progress: 75,
      reward: 'Badge Sábio Conselheiro',
    },
    {
      id: 2,
      title: 'Memorize 3 versículos',
      progress: 66,
      reward: '100 XP Bonus',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story':
        return <BookOpen className="h-4 w-4" />;
      case 'lesson':
        return <Lightbulb className="h-4 w-4" />;
      case 'activity':
        return <Target className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'story':
        return 'bg-gradient-accent';
      case 'lesson':
        return 'bg-gradient-success';
      case 'activity':
        return 'bg-gradient-primary';
      default:
        return 'bg-gradient-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Olá,{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Maria
            </span>
            ! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue sua jornada de crescimento na fé. Você está indo muito bem!
          </p>
        </div>

        {/* Cards de Progresso */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Nível Atual</p>
                  <p className="text-3xl font-bold">{currentProgress.level}</p>
                </div>
                <Star className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress
                  value={
                    (currentProgress.totalXP / currentProgress.nextLevelXP) *
                    100
                  }
                  className="bg-white/20"
                />
                <p className="mt-2 text-xs opacity-90">
                  {currentProgress.totalXP}/{currentProgress.nextLevelXP} XP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-accent-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Trilhas</p>
                  <p className="text-3xl font-bold">
                    {currentProgress.completedPaths}/
                    {currentProgress.totalPaths}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress
                  value={
                    (currentProgress.completedPaths /
                      currentProgress.totalPaths) *
                    100
                  }
                  className="bg-white/20"
                />
                <p className="mt-2 text-xs opacity-90">
                  {Math.round(
                    (currentProgress.completedPaths /
                      currentProgress.totalPaths) *
                      100
                  )}
                  % Completo
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-success-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Sequência</p>
                  <p className="text-3xl font-bold">
                    {currentProgress.currentStreak}
                  </p>
                </div>
                <Flame className="h-8 w-8 opacity-80" />
              </div>
              <p className="mt-4 text-xs opacity-90">
                Dias consecutivos estudando
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-muted-foreground/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-3xl font-bold text-accent">
                    {currentProgress.badges}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
              <Link to="/conquistas">
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Ver Todas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Continue de Onde Parou */}
          <div className="mb-8 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Continue de Onde Parou</span>
                </CardTitle>
                <CardDescription>
                  Suas lições em andamento - clique para continuar estudando
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {currentLessons.map(lesson => (
                    <Link key={lesson.id} to={`/licao/${lesson.lessonId}`}>
                      <Card className="animate-fade-in cursor-pointer transition-all hover:scale-[1.02] hover:shadow-card">
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-center space-x-3">
                            <div
                              className={`h-8 w-8 rounded-lg ${getTypeColor(lesson.type)} flex items-center justify-center text-white`}
                            >
                              {getTypeIcon(lesson.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-sm font-semibold">
                                {lesson.title}
                              </h4>
                              <p className="truncate text-xs text-muted-foreground">
                                {lesson.pathTitle}
                              </p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                Progresso
                              </span>
                              <span className="text-xs font-medium">
                                {lesson.progress}%
                              </span>
                            </div>
                            <Progress
                              value={lesson.progress}
                              className="h-1.5"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.timeLeft}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover-scale h-6 px-2 text-xs"
                            >
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Atividades Recentes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Atividades Recentes</span>
                </CardTitle>
                <CardDescription>
                  Suas últimas conquistas e progressos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 rounded-lg border bg-muted/20 p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                      {activity.type === 'trilha_completa' && (
                        <Trophy className="h-5 w-5 text-white" />
                      )}
                      {activity.type === 'versiculo_memorizado' && (
                        <BookOpen className="h-5 w-5 text-white" />
                      )}
                      {activity.type === 'atividade_pratica' && (
                        <Target className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {activity.xp}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      {activity.badge && (
                        <Badge className="mt-2 bg-gradient-accent text-xs">
                          <Award className="mr-1 h-3 w-3" />
                          {activity.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Próximos Objetivos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Próximos Objetivos</span>
                </CardTitle>
                <CardDescription>Continue progredindo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nextGoals.map(goal => (
                  <div key={goal.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold leading-tight">
                        {goal.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-3 w-3 text-accent" />
                      <span className="text-xs text-muted-foreground">
                        {goal.reward}
                      </span>
                    </div>
                  </div>
                ))}

                <Link to="/trilhas">
                  <Button className="mt-4 w-full bg-gradient-primary">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continuar Estudos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Devocional do Dia */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Devocional do Dia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-accent">
                    <BookOpen className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">O Amor de Deus</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      "Porque Deus amou o mundo de tal maneira..." - João 3:16
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link to="/pais">
                      <Button variant="outline" size="sm" className="w-full">
                        Ler Devocional
                      </Button>
                    </Link>
                    <Link to="/estudo-biblico">
                      <Button size="sm" className="w-full bg-gradient-primary">
                        Estudo Bíblico
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
