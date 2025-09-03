import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  Heart, 
  Calendar,
  TrendingUp,
  MessageCircle,
  Download,
  Settings,
  Clock,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const ParentsArea = () => {
  const childProgress = {
    name: "Maria",
    age: 8,
    level: 3,
    completedPaths: 3,
    totalPaths: 11,
    currentStreak: 7,
    lastActivity: "2 horas atrás"
  };

  const weeklyReport = [
    { day: "Seg", studyTime: 25, goal: 30 },
    { day: "Ter", studyTime: 30, goal: 30 },
    { day: "Qua", studyTime: 20, goal: 30 },
    { day: "Qui", studyTime: 35, goal: 30 },
    { day: "Sex", studyTime: 28, goal: 30 },
    { day: "Sáb", studyTime: 40, goal: 30 },
    { day: "Dom", studyTime: 32, goal: 30 }
  ];

  const parentingTips = [
    {
      id: 1,
      title: "Como ensinar sobre obediência",
      description: "Dicas práticas para ensinar seus filhos sobre a importância da obediência bíblica.",
      category: "Disciplina",
      readTime: "5 min",
      featured: true
    },
    {
      id: 2,
      title: "Orando com crianças pequenas",
      description: "Maneiras criativas de tornar o momento de oração especial para os pequenos.",
      category: "Oração",
      readTime: "3 min"
    },
    {
      id: 3,
      title: "Respondendo perguntas difíceis",
      description: "Como responder perguntas desafiadoras sobre fé de forma adequada à idade.",
      category: "Diálogo",
      readTime: "7 min"
    }
  ];

  const familyActivities = [
    {
      id: 1,
      title: "Noite de Histórias Bíblicas",
      description: "Leia a história de Davi e Golias juntos",
      duration: "30 min",
      materials: ["Bíblia infantil", "Figuras para colorir"]
    },
    {
      id: 2,
      title: "Projeto de Gratidão",
      description: "Criem um mural de coisas pelas quais são gratos",
      duration: "45 min", 
      materials: ["Papel", "Canetas", "Fotos"]
    },
    {
      id: 3,
      title: "Culto Doméstico",
      description: "Momento especial de louvor e oração em família",
      duration: "20 min",
      materials: ["Músicas", "Versículos decorados"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6">
              Área dos <span className="bg-gradient-primary bg-clip-text text-transparent">Pais</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Recursos exclusivos para fortalecer sua fé e equipar você para ensinar e guiar seus filhos 
              no crescimento espiritual. Aqui você encontra estudos aprofundados, ferramentas de ensino e orientação prática.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to="/estudo-biblico">
                <Button className="bg-gradient-primary hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Estudo Bíblico
                </Button>
              </Link>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 mr-2" />
                Devocional
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Users className="w-4 h-4 mr-2" />
                Orientação Familiar
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="progresso" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="progresso">Progresso</TabsTrigger>
            <TabsTrigger value="orientacoes">Orientações</TabsTrigger>
            <TabsTrigger value="estudo-biblico">Estudo Bíblico</TabsTrigger>
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Aba Progresso */}
          <TabsContent value="progresso" className="space-y-6">
            {/* Visão Geral da Criança */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Progresso da {childProgress.name}</span>
                </CardTitle>
                <CardDescription>
                  Acompanhe o desenvolvimento espiritual de sua filha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">Nível {childProgress.level}</h3>
                    <p className="text-sm text-muted-foreground">Jovem Discípula</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-accent flex items-center justify-center mb-3">
                      <BookOpen className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold">{childProgress.completedPaths}/{childProgress.totalPaths}</h3>
                    <p className="text-sm text-muted-foreground">Trilhas Completas</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-success flex items-center justify-center mb-3">
                      <TrendingUp className="w-8 h-8 text-success-foreground" />
                    </div>
                    <h3 className="font-semibold">{childProgress.currentStreak} dias</h3>
                    <p className="text-sm text-muted-foreground">Sequência Atual</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Atividade Semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Atividade Semanal</span>
                </CardTitle>
                <CardDescription>
                  Tempo de estudo diário (meta: 30 min/dia)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weeklyReport.map((day) => (
                    <div key={day.day} className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{day.day}</p>
                      <div className="space-y-2">
                        <div className={`h-20 w-8 mx-auto rounded-lg flex items-end ${
                          day.studyTime >= day.goal ? 'bg-gradient-success' : 'bg-gradient-primary'
                        }`}>
                          <div 
                            className="w-full bg-white/20 rounded-lg"
                            style={{ height: `${(day.studyTime / 45) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs font-medium">{day.studyTime}min</p>
                        {day.studyTime >= day.goal ? (
                          <CheckCircle className="w-4 h-4 text-success mx-auto" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-warning mx-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Orientações */}
          <TabsContent value="orientacoes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentingTips.map((tip) => (
                <Card key={tip.id} className={tip.featured ? "ring-2 ring-primary/20" : ""}>
                  <CardHeader className="pb-4">
                    {tip.featured && (
                      <Badge className="w-fit bg-gradient-primary text-primary-foreground mb-2">
                        Destaque
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{tip.category}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{tip.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {tip.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ler Artigo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Dica Rápida do Dia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <strong>Versículos em ação:</strong> Depois de memorizar um versículo com sua filha, 
                  criem situações práticas onde ela pode aplicar o ensinamento. Por exemplo, 
                  após aprender sobre amor ao próximo, incentive-a a ajudar um amigo necessitado.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Compartilhar Experiência
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Salvar Dica
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Estudo Bíblico */}
          <TabsContent value="estudo-biblico" className="space-y-6">
            {/* Estudos Temáticos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Estudos Temáticos para Pais</span>
                </CardTitle>
                <CardDescription>
                  Fortaleça sua fé e conhecimento bíblico para orientar seus filhos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Paternidade Bíblica</h3>
                          <p className="text-sm text-muted-foreground">12 lições • 6 semanas</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Explore os princípios bíblicos para criar filhos no temor do Senhor, 
                        baseado em Provérbios e Efésios.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-success text-success-foreground">Em Andamento</Badge>
                        <Button size="sm">Continuar</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Educação Cristã Infantil</h3>
                          <p className="text-sm text-muted-foreground">8 lições • 4 semanas</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Como ensinar verdades bíblicas de forma adequada para cada faixa etária.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Disponível</Badge>
                        <Button size="sm" variant="outline">Iniciar</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-success flex items-center justify-center">
                          <Users className="w-5 h-5 text-success-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Família Cristã</h3>
                          <p className="text-sm text-muted-foreground">10 lições • 5 semanas</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Construindo um lar cristão sólido baseado no amor de Cristo e na Palavra.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Disponível</Badge>
                        <Button size="sm" variant="outline">Iniciar</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Disciplina com Amor</h3>
                          <p className="text-sm text-muted-foreground">6 lições • 3 semanas</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Aprenda a disciplinar com sabedoria, seguindo o exemplo de Deus Pai.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Em Breve</Badge>
                        <Button size="sm" disabled>Em Breve</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plano de Leitura Bíblica */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Plano de Leitura Familiar</span>
                  </CardTitle>
                  <CardDescription>Leitura bíblica estruturada para toda a família</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progresso Atual</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <Progress value={65} />
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Semana 1 - Criação</p>
                        <p className="text-xs text-muted-foreground">Gênesis 1-3</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Semana 2 - Noé</p>
                        <p className="text-xs text-muted-foreground">Gênesis 6-9</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border-2 border-primary/20 rounded-lg">
                      <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Semana 3 - Abraão</p>
                        <p className="text-xs text-muted-foreground">Gênesis 12-22</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continuar Leitura
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Devocional Familiar Diário</span>
                  </CardTitle>
                  <CardDescription>Momentos especiais com Deus em família</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Hoje - 3 Dezembro</span>
                    </div>
                    <h3 className="font-semibold mb-2">O Amor de Deus por Nós</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito..." - João 3:16
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Reflexão para a família:</p>
                      <p className="text-xs text-muted-foreground">
                        Como podemos demonstrar amor uns pelos outros hoje?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Clock className="w-3 h-3 mr-2" />
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-3 h-3 mr-2" />
                      Compartilhar
                    </Button>
                  </div>

                  <div className="pt-3 border-t">
                    <h4 className="font-medium text-sm mb-2">Esta Semana:</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Segunda - Fé</span>
                        <CheckCircle className="w-3 h-3 text-success" />
                      </div>
                      <div className="flex justify-between">
                        <span>Terça - Esperança</span>
                        <CheckCircle className="w-3 h-3 text-success" />
                      </div>
                      <div className="flex justify-between">
                        <span>Hoje - Amor</span>
                        <div className="w-3 h-3 rounded-full border border-primary"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Atividades */}
          <TabsContent value="atividades" className="space-y-6">
            <div className="grid gap-6">
              {familyActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{activity.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {activity.duration}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{activity.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Materiais necessários:</h4>
                          <div className="flex flex-wrap gap-2">
                            {activity.materials.map((material, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4 space-y-2">
                        <Button variant="default">
                          <Target className="w-4 h-4 mr-2" />
                          Iniciar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba Relatórios */}
          <TabsContent value="relatorios" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório Mensal</CardTitle>
                  <CardDescription>Novembro 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trilhas Concluídas</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Versículos Memorizados</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo Total de Estudo</span>
                    <span className="font-semibold">12h 30min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Badges Conquistadas</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Relatório Completo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evolução do Nível</CardTitle>
                  <CardDescription>Progresso ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nível Atual</span>
                      <Badge className="bg-gradient-primary">Nível 3</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso para o Nível 4</span>
                        <span>83%</span>
                      </div>
                      <Progress value={83} />
                      <p className="text-xs text-muted-foreground">
                        250 XP restantes para o próximo nível
                      </p>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <h4 className="font-medium text-sm">Histórico de Níveis</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>Nível 3 - 15 Nov 2024</div>
                        <div>Nível 2 - 28 Out 2024</div>
                        <div>Nível 1 - 10 Out 2024</div>
                      </div>
                    </div>
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

export default ParentsArea;