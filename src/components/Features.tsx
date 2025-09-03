import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Trophy,
  Users,
  Calendar,
  Heart,
  Star,
  Target,
  Gamepad2,
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Versículos Interativos',
    description:
      'Versículos bíblicos com animações e áudio para facilitar a memorização.',
    color: 'bg-gradient-primary',
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Sistema de Badges',
    description:
      'Conquiste badges especiais ao completar trilhas e desafios bíblicos.',
    color: 'bg-gradient-accent',
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Atividades Práticas',
    description:
      'Desafios do dia-a-dia para aplicar os ensinamentos bíblicos em casa.',
    color: 'bg-gradient-success',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Área dos Pais',
    description:
      'Orientações e dicas para pais sobre educação cristã por idade.',
    color: 'bg-gradient-primary',
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Devocionais em Família',
    description:
      'Momentos especiais de leitura bíblica e oração para toda a família.',
    color: 'bg-gradient-accent',
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Diário Espiritual',
    description:
      'Registre o crescimento espiritual de seus filhos com marcos especiais.',
    color: 'bg-gradient-success',
  },
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: 'Gamificação Saudável',
    description:
      'Aprendizado divertido sem vícios, focado no crescimento espiritual.',
    color: 'bg-gradient-primary',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Progresso Personalizado',
    description:
      'Trilhas adaptadas para diferentes idades e níveis de compreensão.',
    color: 'bg-gradient-accent',
  },
];

const Features = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Por que escolher nossa{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              plataforma?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Desenvolvido especialmente para famílias cristãs que desejam educar
            seus filhos na Palavra de Deus de forma envolvente e significativa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <CardHeader className="pb-4">
                <div
                  className={`h-16 w-16 rounded-2xl ${feature.color} mb-4 flex items-center justify-center text-white shadow-badge transition-transform group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
