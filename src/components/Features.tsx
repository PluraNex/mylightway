import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Calendar, 
  Heart, 
  Star,
  Target,
  Gamepad2
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Versículos Interativos",
    description: "Versículos bíblicos com animações e áudio para facilitar a memorização.",
    color: "bg-gradient-primary"
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Sistema de Badges",
    description: "Conquiste badges especiais ao completar trilhas e desafios bíblicos.",
    color: "bg-gradient-accent"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Atividades Práticas",
    description: "Desafios do dia-a-dia para aplicar os ensinamentos bíblicos em casa.",
    color: "bg-gradient-success"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Área dos Pais",
    description: "Orientações e dicas para pais sobre educação cristã por idade.",
    color: "bg-gradient-primary"
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Devocionais em Família",
    description: "Momentos especiais de leitura bíblica e oração para toda a família.",
    color: "bg-gradient-accent"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Diário Espiritual",
    description: "Registre o crescimento espiritual de seus filhos com marcos especiais.",
    color: "bg-gradient-success"
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Gamificação Saudável",
    description: "Aprendizado divertido sem vícios, focado no crescimento espiritual.",
    color: "bg-gradient-primary"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Progresso Personalizado",
    description: "Trilhas adaptadas para diferentes idades e níveis de compreensão.",
    color: "bg-gradient-accent"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Por que escolher nossa{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              plataforma?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desenvolvido especialmente para famílias cristãs que desejam educar seus 
            filhos na Palavra de Deus de forma envolvente e significativa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center text-white shadow-badge mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
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