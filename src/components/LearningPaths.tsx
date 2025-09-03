import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Heart,
  Shield,
  Gift,
  Sword,
  Users,
  Eye,
  Mountain,
  Brain,
  Music,
  Hand,
  Star,
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  badges: number;
  totalBadges: number;
  verses: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
}

const learningPaths: LearningPath[] = [
  {
    id: 'prudencia',
    title: 'Prudência',
    description:
      'Aprenda a tomar decisões sábias seguindo os conselhos de Deus.',
    icon: <Brain className="h-6 w-6" />,
    color: 'bg-gradient-primary',
    progress: 75,
    badges: 3,
    totalBadges: 4,
    verses: 8,
    status: 'in-progress',
  },
  {
    id: 'obediencia',
    title: 'Obediência',
    description: 'Descubra a alegria de obedecer a Deus e aos pais.',
    icon: <Heart className="h-6 w-6" />,
    color: 'bg-gradient-accent',
    progress: 100,
    badges: 5,
    totalBadges: 5,
    verses: 12,
    status: 'completed',
  },
  {
    id: 'generosidade',
    title: 'Generosidade',
    description: 'Aprenda o valor de compartilhar e ajudar o próximo.',
    icon: <Gift className="h-6 w-6" />,
    color: 'bg-gradient-success',
    progress: 40,
    badges: 2,
    totalBadges: 5,
    verses: 6,
    status: 'in-progress',
  },
  {
    id: 'coragem',
    title: 'Coragem',
    description: 'Seja corajoso como Davi enfrentando os gigantes da vida.',
    icon: <Sword className="h-6 w-6" />,
    color: 'bg-gradient-primary',
    progress: 0,
    badges: 0,
    totalBadges: 6,
    verses: 10,
    status: 'available',
  },
  {
    id: 'amor-proximo',
    title: 'Amor ao Próximo',
    description: 'Como Jesus nos ensinou a amar e cuidar uns dos outros.',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-gradient-accent',
    progress: 0,
    badges: 0,
    totalBadges: 4,
    verses: 8,
    status: 'available',
  },
  {
    id: 'verdade',
    title: 'Verdade',
    description: 'A importância de sempre falar a verdade em amor.',
    icon: <Eye className="h-6 w-6" />,
    color: 'bg-gradient-success',
    progress: 0,
    badges: 0,
    totalBadges: 3,
    verses: 7,
    status: 'locked',
  },
  {
    id: 'fe',
    title: 'Fé',
    description: 'Confie em Deus mesmo quando não conseguimos ver o caminho.',
    icon: <Mountain className="h-6 w-6" />,
    color: 'bg-gradient-primary',
    progress: 0,
    badges: 0,
    totalBadges: 6,
    verses: 15,
    status: 'locked',
  },
  {
    id: 'sabedoria',
    title: 'Sabedoria',
    description: 'Busque a sabedoria que vem do alto, como Salomão.',
    icon: <Star className="h-6 w-6" />,
    color: 'bg-gradient-accent',
    progress: 0,
    badges: 0,
    totalBadges: 5,
    verses: 12,
    status: 'locked',
  },
  {
    id: 'autocontrole',
    title: 'Autocontrole',
    description:
      'Aprenda a controlar suas emoções com a ajuda do Espírito Santo.',
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-gradient-success',
    progress: 0,
    badges: 0,
    totalBadges: 4,
    verses: 9,
    status: 'locked',
  },
  {
    id: 'louvor',
    title: 'Louvor',
    description: 'Alegre-se sempre e louve a Deus em todas as circunstâncias.',
    icon: <Music className="h-6 w-6" />,
    color: 'bg-gradient-primary',
    progress: 0,
    badges: 0,
    totalBadges: 3,
    verses: 6,
    status: 'locked',
  },
  {
    id: 'oracao',
    title: 'Oração',
    description: 'Converse com Deus todos os dias através da oração.',
    icon: <Hand className="h-6 w-6" />,
    color: 'bg-gradient-accent',
    progress: 0,
    badges: 0,
    totalBadges: 5,
    verses: 11,
    status: 'locked',
  },
];

const LearningPaths = () => {
  const getStatusBadge = (status: LearningPath['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-gradient-success text-success-foreground">
            Concluído
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-gradient-primary text-primary-foreground">
            Em Progresso
          </Badge>
        );
      case 'available':
        return <Badge variant="outline">Disponível</Badge>;
      case 'locked':
        return <Badge variant="secondary">Bloqueado</Badge>;
      default:
        return null;
    }
  };

  const getCardClass = (status: LearningPath['status']) => {
    switch (status) {
      case 'locked':
        return 'opacity-50 cursor-not-allowed';
      case 'completed':
        return 'ring-2 ring-success/20 shadow-card';
      case 'in-progress':
        return 'ring-2 ring-primary/20 shadow-card';
      default:
        return 'hover:shadow-card transition-shadow cursor-pointer';
    }
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Trilhas de{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Aprendizado Bíblico
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Cada trilha é uma jornada de descoberta dos valores cristãos, com
            versículos, histórias bíblicas e atividades práticas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningPaths.map(path => (
            <Card
              key={path.id}
              className={`relative overflow-hidden ${getCardClass(path.status)}`}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <div
                    className={`rounded-xl p-3 ${path.color} text-white shadow-badge`}
                  >
                    {path.icon}
                  </div>
                  {getStatusBadge(path.status)}
                </div>
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {path.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {path.status !== 'locked' ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-accent">
                          {path.badges}/{path.totalBadges}
                        </div>
                        <div className="text-muted-foreground">Badges</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-primary">
                          {path.verses}
                        </div>
                        <div className="text-muted-foreground">Versículos</div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={
                        path.status === 'available' ? 'default' : 'outline'
                      }
                      asChild
                    >
                      <Link to={`/trilhas/${path.id}`}>
                        {path.status === 'completed'
                          ? 'Revisar'
                          : path.status === 'in-progress'
                            ? 'Continuar'
                            : 'Começar'}
                      </Link>
                    </Button>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <p className="mb-2 text-sm text-muted-foreground">
                      Complete trilhas anteriores para desbloquear
                    </p>
                    <Button disabled variant="secondary" className="w-full">
                      Bloqueado
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
