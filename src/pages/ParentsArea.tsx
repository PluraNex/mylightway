import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ParentsArea = () => {
  const childProgress = {
    name: 'Maria',
    age: 8,
    level: 3,
    completedPaths: 3,
    totalPaths: 11,
    currentStreak: 7,
    lastActivity: '2 horas atrás',
  };

  const weeklyReport = [
    { day: 'Seg', studyTime: 25, goal: 30 },
    { day: 'Ter', studyTime: 30, goal: 30 },
    { day: 'Qua', studyTime: 20, goal: 30 },
    { day: 'Qui', studyTime: 35, goal: 30 },
    { day: 'Sex', studyTime: 28, goal: 30 },
    { day: 'Sáb', studyTime: 40, goal: 30 },
    { day: 'Dom', studyTime: 32, goal: 30 },
  ];

  const parentingTips = [
    {
      id: 1,
      title: 'Como ensinar sobre obediência',
      description:
        'Dicas práticas para ensinar seus filhos sobre a importância da obediência bíblica.',
      category: 'Disciplina',
      readTime: '5 min',
      featured: true,
    },
    {
      id: 2,
      title: 'Orando com crianças pequenas',
      description:
        'Maneiras criativas de tornar o momento de oração especial para os pequenos.',
      category: 'Oração',
      readTime: '3 min',
    },
    {
      id: 3,
      title: 'Respondendo perguntas difíceis',
      description:
        'Como responder perguntas desafiadoras sobre fé de forma adequada à idade.',
      category: 'Diálogo',
      readTime: '7 min',
    },
  ];

  const familyActivities = [
    {
      id: 1,
      title: 'Noite de Histórias Bíblicas',
      description: 'Leia a história de Davi e Golias juntos',
      duration: '30 min',
      materials: ['Bíblia infantil', 'Figuras para colorir'],
    },
    {
      id: 2,
      title: 'Projeto de Gratidão',
      description: 'Criem um mural de coisas pelas quais são gratos',
      duration: '45 min',
      materials: ['Papel', 'Canetas', 'Fotos'],
    },
    {
      id: 3,
      title: 'Culto Doméstico',
      description: 'Momento especial de louvor e oração em família',
      duration: '20 min',
      materials: ['Músicas', 'Versículos decorados'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-8">
            <h1 className="mb-6 text-4xl font-bold">
              Área dos{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pais
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Recursos exclusivos para fortalecer sua fé e equipar você para
              ensinar e guiar seus filhos no crescimento espiritual. Aqui você
              encontra estudos aprofundados, ferramentas de ensino e orientação
              prática.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/estudo-biblico">
                <Button className="bg-gradient-primary transition-transform hover:scale-105">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Estudo Bíblico
                </Button>
              </Link>
              <Button
                variant="outline"
                className="transition-transform hover:scale-105"
              >
                <Heart className="mr-2 h-4 w-4" />
                Devocional
              </Button>
              <Button
                variant="outline"
                className="transition-transform hover:scale-105"
              >
                <Users className="mr-2 h-4 w-4" />
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
                  <Users className="h-5 w-5" />
                  <span>Progresso da {childProgress.name}</span>
                </CardTitle>
                <CardDescription>
                  Acompanhe o desenvolvimento espiritual de sua filha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold">
                      Nível {childProgress.level}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Jovem Discípula
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-accent">
                      <BookOpen className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold">
                      {childProgress.completedPaths}/{childProgress.totalPaths}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Trilhas Completas
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-success">
                      <TrendingUp className="h-8 w-8 text-success-foreground" />
                    </div>
                    <h3 className="font-semibold">
                      {childProgress.currentStreak} dias
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sequência Atual
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Atividade Semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Atividade Semanal</span>
                </CardTitle>
                <CardDescription>
                  Tempo de estudo diário (meta: 30 min/dia)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weeklyReport.map(day => (
                    <div key={day.day} className="text-center">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {day.day}
                      </p>
                      <div className="space-y-2">
                        <div
                          className={`mx-auto flex h-20 w-8 items-end rounded-lg ${
                            day.studyTime >= day.goal
                              ? 'bg-gradient-success'
                              : 'bg-gradient-primary'
                          }`}
                        >
                          <div
                            className="w-full rounded-lg bg-white/20"
                            style={{ height: `${(day.studyTime / 45) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs font-medium">
                          {day.studyTime}min
                        </p>
                        {day.studyTime >= day.goal ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-success" />
                        ) : (
                          <AlertCircle className="mx-auto h-4 w-4 text-warning" />
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {parentingTips.map(tip => (
                <Card
                  key={tip.id}
                  className={tip.featured ? 'ring-2 ring-primary/20' : ''}
                >
                  <CardHeader className="pb-4">
                    {tip.featured && (
                      <Badge className="mb-2 w-fit bg-gradient-primary text-primary-foreground">
                        Destaque
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{tip.category}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{tip.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {tip.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Ler Artigo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Dica Rápida do Dia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  <strong>Versículos em ação:</strong> Depois de memorizar um
                  versículo com sua filha, criem situações práticas onde ela
                  pode aplicar o ensinamento. Por exemplo, após aprender sobre
                  amor ao próximo, incentive-a a ajudar um amigo necessitado.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Compartilhar Experiência
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
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
                  <BookOpen className="h-5 w-5" />
                  <span>Estudos Temáticos para Pais</span>
                </CardTitle>
                <CardDescription>
                  Fortaleça sua fé e conhecimento bíblico para orientar seus
                  filhos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Paternidade Bíblica</h3>
                          <p className="text-sm text-muted-foreground">
                            12 lições • 6 semanas
                          </p>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Explore os princípios bíblicos para criar filhos no
                        temor do Senhor, baseado em Provérbios e Efésios.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-success text-success-foreground">
                          Em Andamento
                        </Badge>
                        <Button size="sm">Continuar</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent">
                          <Lightbulb className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Educação Cristã Infantil
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            8 lições • 4 semanas
                          </p>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Como ensinar verdades bíblicas de forma adequada para
                        cada faixa etária.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Disponível</Badge>
                        <Button size="sm" variant="outline">
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-success">
                          <Users className="h-5 w-5 text-success-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Família Cristã</h3>
                          <p className="text-sm text-muted-foreground">
                            10 lições • 5 semanas
                          </p>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Construindo um lar cristão sólido baseado no amor de
                        Cristo e na Palavra.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Disponível</Badge>
                        <Button size="sm" variant="outline">
                          Iniciar
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Disciplina com Amor</h3>
                          <p className="text-sm text-muted-foreground">
                            6 lições • 3 semanas
                          </p>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Aprenda a disciplinar com sabedoria, seguindo o exemplo
                        de Deus Pai.
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Em Breve</Badge>
                        <Button size="sm" disabled>
                          Em Breve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plano de Leitura Bíblica */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Plano de Leitura Familiar</span>
                  </CardTitle>
                  <CardDescription>
                    Leitura bíblica estruturada para toda a família
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progresso Atual</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <Progress value={65} />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Semana 1 - Criação
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gênesis 1-3
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Semana 2 - Noé</p>
                        <p className="text-xs text-muted-foreground">
                          Gênesis 6-9
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border-2 border-primary/20 p-3">
                      <div className="h-4 w-4 rounded-full border-2 border-primary"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Semana 3 - Abraão</p>
                        <p className="text-xs text-muted-foreground">
                          Gênesis 12-22
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continuar Leitura
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Devocional Familiar Diário</span>
                  </CardTitle>
                  <CardDescription>
                    Momentos especiais com Deus em família
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 p-4">
                    <div className="mb-2 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Hoje - 3 Dezembro
                      </span>
                    </div>
                    <h3 className="mb-2 font-semibold">
                      O Amor de Deus por Nós
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      "Porque Deus tanto amou o mundo que deu o seu Filho
                      Unigênito..." - João 3:16
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">
                        Reflexão para a família:
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Como podemos demonstrar amor uns pelos outros hoje?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Clock className="mr-2 h-3 w-3" />
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="mr-2 h-3 w-3" />
                      Compartilhar
                    </Button>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="mb-2 text-sm font-medium">Esta Semana:</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Segunda - Fé</span>
                        <CheckCircle className="h-3 w-3 text-success" />
                      </div>
                      <div className="flex justify-between">
                        <span>Terça - Esperança</span>
                        <CheckCircle className="h-3 w-3 text-success" />
                      </div>
                      <div className="flex justify-between">
                        <span>Hoje - Amor</span>
                        <div className="h-3 w-3 rounded-full border border-primary"></div>
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
              {familyActivities.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">
                            {activity.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {activity.duration}
                          </Badge>
                        </div>
                        <p className="mb-4 text-muted-foreground">
                          {activity.description}
                        </p>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">
                            Materiais necessários:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activity.materials.map((material, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 space-y-2">
                        <Button variant="default">
                          <Target className="mr-2 h-4 w-4" />
                          Iniciar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório Mensal</CardTitle>
                  <CardDescription>Novembro 2024</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trilhas Concluídas</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Versículos Memorizados</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tempo Total de Estudo</span>
                    <span className="font-semibold">12h 30min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Badges Conquistadas</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <Download className="mr-2 h-4 w-4" />
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

                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-medium">
                        Histórico de Níveis
                      </h4>
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
