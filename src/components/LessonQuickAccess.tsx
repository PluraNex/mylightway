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
  BookOpen,
  Clock,
  Play,
  Target,
  Lightbulb,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lesson {
  id: number;
  title: string;
  pathTitle: string;
  progress: number;
  timeLeft: string;
  type: 'story' | 'lesson' | 'activity' | 'video' | 'quiz';
  lessonId: string;
  difficulty?: 'Fácil' | 'Médio' | 'Avançado';
}

interface LessonQuickAccessProps {
  lessons: Lesson[];
  title?: string;
  description?: string;
  showProgress?: boolean;
  compact?: boolean;
}

const LessonQuickAccess = ({
  lessons,
  title = 'Acesso Rápido às Lições',
  description = 'Continue seus estudos de onde parou',
  showProgress = true,
  compact = false,
}: LessonQuickAccessProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story':
        return <BookOpen className="h-4 w-4" />;
      case 'lesson':
        return <Lightbulb className="h-4 w-4" />;
      case 'activity':
        return <Target className="h-4 w-4" />;
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <Star className="h-4 w-4" />;
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
      case 'video':
        return 'bg-gradient-primary';
      case 'quiz':
        return 'bg-gradient-accent';
      default:
        return 'bg-gradient-primary';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-success/10 text-success border-success/20';
      case 'Médio':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Avançado':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="space-y-2">
          {lessons.map(lesson => (
            <Link key={lesson.id} to={`/licao/${lesson.lessonId}`}>
              <div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div
                  className={`h-8 w-8 rounded-lg ${getTypeColor(lesson.type)} flex flex-shrink-0 items-center justify-center text-white`}
                >
                  {getTypeIcon(lesson.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{lesson.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {lesson.pathTitle}
                  </p>
                </div>
                {showProgress && (
                  <div className="flex items-center space-x-2">
                    <Progress value={lesson.progress} className="h-1.5 w-16" />
                    <span className="min-w-[3rem] text-xs text-muted-foreground">
                      {lesson.progress}%
                    </span>
                  </div>
                )}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map(lesson => (
            <Link key={lesson.id} to={`/licao/${lesson.lessonId}`}>
              <Card className="animate-fade-in cursor-pointer transition-all hover:scale-[1.02] hover:shadow-card">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg ${getTypeColor(lesson.type)} flex items-center justify-center text-white`}
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

                  {lesson.difficulty && (
                    <div className="mb-3">
                      <Badge
                        className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}
                      >
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  )}

                  {showProgress && (
                    <div className="mb-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Progresso
                        </span>
                        <span className="text-xs font-medium">
                          {lesson.progress}%
                        </span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.timeLeft}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover-scale h-7 px-3 text-xs"
                    >
                      Continuar
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <BookOpen className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p className="text-sm">Nenhuma lição em andamento</p>
            <p className="mt-1 text-xs">
              Comece uma nova trilha para ver suas lições aqui
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonQuickAccess;
