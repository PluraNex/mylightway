import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Play,
  Target,
  Lightbulb,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

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
  title = "Acesso Rápido às Lições",
  description = "Continue seus estudos de onde parou",
  showProgress = true,
  compact = false 
}: LessonQuickAccessProps) => {
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return <BookOpen className="w-4 h-4" />;
      case 'lesson': return <Lightbulb className="w-4 h-4" />;
      case 'activity': return <Target className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'quiz': return <Star className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'story': return 'bg-gradient-accent';
      case 'lesson': return 'bg-gradient-success';
      case 'activity': return 'bg-gradient-primary';
      case 'video': return 'bg-gradient-primary';
      case 'quiz': return 'bg-gradient-accent';
      default: return 'bg-gradient-primary';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-success/10 text-success border-success/20';
      case 'Médio': return 'bg-primary/10 text-primary border-primary/20';
      case 'Avançado': return 'bg-accent/10 text-accent-foreground border-accent/20';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <Link key={lesson.id} to={`/licao/${lesson.lessonId}`}>
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`w-8 h-8 rounded-lg ${getTypeColor(lesson.type)} flex items-center justify-center text-white flex-shrink-0`}>
                  {getTypeIcon(lesson.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{lesson.pathTitle}</p>
                </div>
                {showProgress && (
                  <div className="flex items-center space-x-2">
                    <Progress value={lesson.progress} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground min-w-[3rem]">{lesson.progress}%</span>
                  </div>
                )}
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
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
          <Play className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <Link key={lesson.id} to={`/licao/${lesson.lessonId}`}>
              <Card className="hover:shadow-card transition-all hover:scale-[1.02] cursor-pointer animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${getTypeColor(lesson.type)} flex items-center justify-center text-white`}>
                      {getTypeIcon(lesson.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{lesson.pathTitle}</p>
                    </div>
                  </div>
                  
                  {lesson.difficulty && (
                    <div className="mb-3">
                      <Badge className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  )}
                  
                  {showProgress && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progresso</span>
                        <span className="text-xs font-medium">{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.timeLeft}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 px-3 text-xs hover-scale">
                      Continuar
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {lessons.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhuma lição em andamento</p>
            <p className="text-xs mt-1">Comece uma nova trilha para ver suas lições aqui</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonQuickAccess;