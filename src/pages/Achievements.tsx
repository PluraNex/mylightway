import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Award, 
  Crown,
  Heart,
  Shield,
  Sword,
  Gift,
  Target,
  Book,
  Flame,
  Lock,
  CheckCircle
} from "lucide-react";

const Achievements = () => {
  const userStats = {
    totalBadges: 12,
    totalXP: 1250,
    level: 3,
    rank: "Jovem Discípula"
  };

  const earnedBadges = [
    {
      id: 1,
      name: "Coração Obediente",
      description: "Completou a trilha de Obediência",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-accent",
      category: "Trilhas",
      earnedAt: "15 Nov 2024",
      rarity: "Comum"
    },
    {
      id: 2,
      name: "Primeira Memorização",
      description: "Memorizou seu primeiro versículo",
      icon: <Book className="w-8 h-8" />,
      color: "bg-gradient-primary",
      category: "Versículos",
      earnedAt: "10 Nov 2024",
      rarity: "Comum"
    },
    {
      id: 3,
      name: "Generoso de Coração",
      description: "Completou atividades de generosidade",
      icon: <Gift className="w-8 h-8" />,
      color: "bg-gradient-success",
      category: "Virtudes",
      earnedAt: "8 Nov 2024",
      rarity: "Raro"
    },
    {
      id: 4,
      name: "Sequência de Fogo",
      description: "7 dias consecutivos estudando",
      icon: <Flame className="w-8 h-8" />,
      color: "bg-gradient-accent",
      category: "Consistência",
      earnedAt: "5 Nov 2024",
      rarity: "Épico"
    }
  ];

  const availableBadges = [
    {
      id: 5,
      name: "Sábio Conselheiro",
      description: "Complete a trilha de Prudência",
      icon: <Crown className="w-8 h-8" />,
      color: "bg-gradient-primary",
      category: "Trilhas",
      progress: 75,
      requirement: "75% da trilha Prudência"
    },
    {
      id: 6,
      name: "Guerreiro da Fé",
      description: "Complete a trilha de Coragem",
      icon: <Sword className="w-8 h-8" />,
      color: "bg-gradient-success",
      category: "Trilhas",
      progress: 0,
      requirement: "Complete a trilha Coragem"
    },
    {
      id: 7,
      name: "Protetor Divino",
      description: "Complete a trilha de Fé",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-primary",
      category: "Trilhas",
      progress: 0,
      requirement: "Desbloqueie primeiro a trilha Fé"
    }
  ];

  const levelRewards = [
    {
      level: 1,
      title: "Pequeno Aprendiz",
      description: "Bem-vindo à jornada!",
      unlocked: true,
      rewards: ["Avatar personalizado", "Primeira trilha desbloqueada"]
    },
    {
      level: 2,
      title: "Jovem Explorador", 
      description: "Continuando a descobrir",
      unlocked: true,
      rewards: ["Novas trilhas", "Sistema de badges"]
    },
    {
      level: 3,
      title: "Jovem Discípula",
      description: "Crescendo na fé",
      unlocked: true,
      rewards: ["Área dos pais", "Relatórios de progresso"]
    },
    {
      level: 4,
      title: "Discípula Dedicada",
      description: "Comprometida com o aprendizado",
      unlocked: false,
      rewards: ["Trilhas avançadas", "Certificados especiais"],
      progress: 83
    },
    {
      level: 5,
      title: "Embaixadora da Fé",
      description: "Exemplo para outros",
      unlocked: false,
      rewards: ["Modo mentor", "Conteúdo exclusivo"]
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Comum": return "text-muted-foreground";
      case "Raro": return "text-primary";
      case "Épico": return "text-accent";
      case "Lendário": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Minhas <span className="bg-gradient-primary bg-clip-text text-transparent">Conquistas</span>
          </h1>
          <p className="text-muted-foreground">
            Celebre cada passo da sua jornada de crescimento na fé!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-2xl font-bold">{userStats.totalBadges}</p>
              <p className="text-sm text-muted-foreground">Badges Conquistadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold">{userStats.totalXP}</p>
              <p className="text-sm text-muted-foreground">Pontos de Experiência</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-success mx-auto mb-3" />
              <p className="text-2xl font-bold">{userStats.level}</p>
              <p className="text-sm text-muted-foreground">Nível Atual</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-lg font-bold">{userStats.rank}</p>
              <p className="text-sm text-muted-foreground">Título Atual</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="niveis">Níveis</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          </TabsList>

          {/* Aba Badges */}
          <TabsContent value="badges" className="space-y-6">
            {/* Badges Conquistadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Badges Conquistadas ({earnedBadges.length})</span>
                </CardTitle>
                <CardDescription>
                  Suas conquistas na jornada de fé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <Card key={badge.id} className="relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-xl ${badge.color} flex items-center justify-center text-white shadow-badge flex-shrink-0`}>
                            {badge.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-sm">{badge.name}</h3>
                              <CheckCircle className="w-4 h-4 text-success" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {badge.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {badge.category}
                              </Badge>
                              <span className={`text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                                {badge.rarity}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {badge.earnedAt}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Próximas Conquistas</span>
                </CardTitle>
                <CardDescription>
                  Badges que você pode conquistar em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableBadges.map((badge) => (
                    <Card key={badge.id} className="relative overflow-hidden opacity-80">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-xl ${badge.color} flex items-center justify-center text-white shadow-badge flex-shrink-0 relative`}>
                            {badge.progress === 0 && (
                              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-white" />
                              </div>
                            )}
                            {badge.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                            <p className="text-xs text-muted-foreground mb-3">
                              {badge.description}
                            </p>
                            
                            {badge.progress !== undefined && badge.progress > 0 && (
                              <div className="space-y-1 mb-2">
                                <div className="flex justify-between text-xs">
                                  <span>Progresso</span>
                                  <span>{badge.progress}%</span>
                                </div>
                                <Progress value={badge.progress} className="h-1" />
                              </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                              {badge.requirement}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Níveis */}
          <TabsContent value="niveis" className="space-y-6">
            <div className="space-y-4">
              {levelRewards.map((level) => (
                <Card key={level.level} className={`${level.unlocked ? 'shadow-card' : 'opacity-60'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        level.unlocked ? 'bg-gradient-primary' : 'bg-muted'
                      } flex-shrink-0`}>
                        {level.unlocked ? (
                          <Crown className="w-10 h-10 text-white" />
                        ) : (
                          <Lock className="w-10 h-10 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold">Nível {level.level}</h3>
                          <Badge className={level.unlocked ? "bg-gradient-success" : "bg-muted"}>
                            {level.unlocked ? "Desbloqueado" : "Bloqueado"}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-primary mb-1">{level.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                        
                        {level.progress !== undefined && (
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-sm">
                              <span>Progresso</span>
                              <span>{level.progress}%</span>
                            </div>
                            <Progress value={level.progress} />
                          </div>
                        )}
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Recompensas:</h5>
                          <div className="flex flex-wrap gap-2">
                            {level.rewards.map((reward, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reward}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba Estatísticas */}
          <TabsContent value="estatisticas" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progresso Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trilhas Completas</span>
                    <span className="font-semibold">3/11</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Versículos Memorizados</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Atividades Realizadas</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo Total de Estudo</span>
                    <span className="font-semibold">24h 15min</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conquistas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trilhas</span>
                    <Badge className="bg-gradient-primary">4 badges</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Versículos</span>
                    <Badge className="bg-gradient-accent">3 badges</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Virtudes</span>
                    <Badge className="bg-gradient-success">3 badges</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consistência</span>
                    <Badge className="bg-gradient-primary">2 badges</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Achievements;