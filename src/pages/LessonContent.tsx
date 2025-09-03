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
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  Quote,
  FileText,
  Video,
  Headphones,
  Download,
  Share2,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Info,
  MessageSquare,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const LessonContent = () => {
  const { lessonId } = useParams();
  const { toast } = useToast();
  const [progress, setProgress] = useState(65);
  const [currentSection, setCurrentSection] = useState(2);

  // Estados para versículos clicáveis
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [showVerseModal, setShowVerseModal] = useState(false);

  // Mock data dos versículos com informações completas
  const versesDatabase = {
    '1 Samuel 3:10': {
      reference: '1 Samuel 3:10',
      text: 'Fala, porque o teu servo ouve.',
      context: 'Samuel responde ao chamado de Deus no templo',
      book: '1 Samuel',
      chapter: 3,
      verse: 10,
      theme: 'Obediência a Deus',
      explanation:
        'Esta é a resposta de Samuel quando finalmente compreendeu que era Deus quem o chamava. Representa uma atitude de humildade e prontidão para ouvir a voz divina.',
      crossReferences: [
        {
          reference: 'Isaías 6:8',
          text: 'Depois disto ouvi a voz do Senhor, que dizia: A quem enviarei, e quem há de ir por nós? Então disse eu: Eis-me aqui, envia-me a mim.',
          context: 'Isaías também responde prontamente ao chamado divino',
        },
        {
          reference: 'Salmos 85:8',
          text: 'Escutarei o que Deus, o Senhor, falar; porque falará de paz ao seu povo e aos seus santos.',
          context: 'A importância de escutar a voz de Deus',
        },
        {
          reference: 'João 10:27',
          text: 'As minhas ovelhas ouvem a minha voz, e eu conheço-as, e elas me seguem.',
          context: 'Jesus fala sobre ouvir e seguir Sua voz',
        },
        {
          reference: 'Apocalipse 3:20',
          text: 'Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei a ele.',
          context: 'Deus continua chamando aqueles que querem ouvi-Lo',
        },
      ],
      applications: [
        'Tenha um coração disposto a ouvir a Deus',
        'Responda com humildade quando Deus falar',
        'Esteja pronto para obedecer mesmo sem entender completamente',
        'Cultive momentos de silêncio para ouvir a voz divina',
      ],
    },
    'Isaías 6:8': {
      reference: 'Isaías 6:8',
      text: 'Depois disto ouvi a voz do Senhor, que dizia: A quem enviarei, e quem há de ir por nós? Então disse eu: Eis-me aqui, envia-me a mim.',
      context: 'Isaías responde ao chamado missionário de Deus',
      book: 'Isaías',
      chapter: 6,
      verse: 8,
      theme: 'Chamado Missionário',
      explanation:
        'Após uma experiência de purificação, Isaías se oferece voluntariamente para servir a Deus, demonstrando disposição total.',
      crossReferences: [
        {
          reference: '1 Samuel 3:10',
          text: 'Fala, porque o teu servo ouve.',
          context: 'Samuel também demonstra prontidão para ouvir e obedecer',
        },
        {
          reference: 'Romanos 10:15',
          text: 'E como pregarão, se não forem enviados? Como está escrito: Quão formosos os pés dos que anunciam a paz.',
          context: 'A importância de ser enviado por Deus',
        },
      ],
      applications: [
        'Ofereça-se voluntariamente para servir a Deus',
        'Esteja disposto a ir onde Deus enviar',
        'Responda prontamente ao chamado divino',
      ],
    },
  };

  // Função para detectar e tornar versículos clicáveis
  const makeVersesClickable = (text: string) => {
    // Regex para detectar referências bíblicas (exemplo: "1 Samuel 3:10", "João 3:16", etc.)
    const verseRegex = /(\d*\s*[A-Za-záêçõã]+\s+\d+:\d+)/g;

    return text.split(verseRegex).map((part, index) => {
      if (
        verseRegex.test(part) &&
        versesDatabase[part as keyof typeof versesDatabase]
      ) {
        return (
          <span
            key={index}
            className="inline-flex cursor-pointer items-center font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
            onClick={() => {
              setSelectedVerse(
                versesDatabase[part as keyof typeof versesDatabase]
              );
              setShowVerseModal(true);
            }}
            title={`Clique para ver informações sobre ${part}`}
          >
            {part}
            <ExternalLink className="ml-1 h-3 w-3 opacity-60" />
          </span>
        );
      }
      return part;
    });
  };

  // Mock data da lição atual
  const lessonData = {
    id: 'obediencia-samuel',
    title: 'A História de Samuel: Um Coração Obediente',
    pathTitle: 'Trilha da Obediência',
    duration: '15 minutos',
    estimatedTime: '12 min restantes',
    progress: 65,
    currentSection: 2,
    totalSections: 4,
    verse: '1 Samuel 3:10',
    verseText: '"Fala, porque o teu servo ouve." - 1 Samuel 3:10',
  };

  const sections = [
    {
      id: 1,
      title: 'Introdução: Conhecendo Samuel',
      completed: true,
      content: 'Já concluído',
    },
    {
      id: 2,
      title: 'O Chamado no Templo',
      completed: false,
      active: true,
      content: 'Seção atual',
    },
    {
      id: 3,
      title: 'A Resposta de Samuel',
      completed: false,
      content: 'Próxima seção',
    },
    {
      id: 4,
      title: 'Aplicação Prática',
      completed: false,
      content: 'Seção final',
    },
  ];

  const handleCompleteSection = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
      setProgress(progress + 25);
      toast({
        title: 'Seção Concluída!',
        description: 'Você avançou para a próxima parte da lição.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header da Lição */}
        <div className="mb-8">
          <Link
            to="/trilhas/obediencia"
            className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para {lessonData.pathTitle}
          </Link>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{lessonData.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{lessonData.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>
                    Seção {lessonData.currentSection} de{' '}
                    {lessonData.totalSections}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Progresso */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Progresso da Lição</span>
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Layout Principal */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Navegação Lateral */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Seções da Lição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sections.map(section => (
                  <div
                    key={section.id}
                    className={`cursor-pointer rounded-lg p-3 transition-all ${
                      section.active
                        ? 'border border-primary/20 bg-primary/10'
                        : section.completed
                          ? 'border border-success/20 bg-success/10'
                          : 'bg-muted/20 hover:bg-muted/40'
                    }`}
                    onClick={() => {
                      if (section.completed || section.active) {
                        setCurrentSection(section.id);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          section.completed
                            ? 'bg-success text-success-foreground'
                            : section.active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {section.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          section.id
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-medium ${
                            section.active
                              ? 'text-primary'
                              : section.completed
                                ? 'text-success'
                                : ''
                          }`}
                        >
                          {section.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {/* Versículo Destaque */}
                <div className="bg-gradient-primary/10 mb-8 rounded-lg border-l-4 border-primary p-6">
                  <div className="flex items-start space-x-3">
                    <Quote className="mt-1 h-6 w-6 text-primary" />
                    <div>
                      <p className="mb-2 text-lg font-medium">
                        {lessonData.verseText}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Versículo principal desta lição
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do Artigo */}
                <article className="prose prose-lg max-w-none">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    O Chamado no Templo
                  </h2>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {makeVersesClickable(
                      'Era noite no templo de Siló. O jovem Samuel, ainda criança, servia ao Senhor sob a orientação do sacerdote Eli. As lâmpadas do templo ainda brilhavam, e Samuel dormia tranquilamente quando algo extraordinário aconteceu. Como vemos em 1 Samuel 3:10, Samuel aprendeu a responder com humildade.'
                    )}
                  </p>

                  <div className="mb-6 rounded-lg bg-accent/20 p-6">
                    <h3 className="mb-3 flex items-center text-xl font-semibold text-foreground">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                      Para Pais e Educadores
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>Dica de Ensino:</strong> Use este momento para
                      explicar às crianças como Deus ainda fala conosco hoje.
                      Ele pode falar através da Bíblia, da oração, de pais e
                      pastores, e através de circunstâncias especiais.
                    </p>
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    A Voz que Chama
                  </h3>

                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    "Samuel! Samuel!" Uma voz clara ecoou pelo templo. Samuel
                    acordou imediatamente. Ele pensou que era Eli quem o
                    chamava, então correu até onde o sacerdote estava e disse:
                    "Aqui estou, pois me chamaste."
                  </p>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Mas Eli respondeu: "Não te chamei; volta a deitar-te."
                    Samuel obedeceu prontamente e voltou para seu lugar. Esta
                    resposta de obediência imediata é o primeiro exemplo que
                    vemos do caráter de Samuel.
                  </p>

                  <div className="bg-gradient-accent/10 mb-6 rounded-lg p-6">
                    <h4 className="mb-3 flex items-center font-semibold text-foreground">
                      <Heart className="mr-2 h-4 w-4 text-accent" />
                      Reflexão para a Família
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <strong>Pergunta:</strong> Como Samuel mostrou
                        obediência mesmo quando estava confuso?
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Resposta:</strong> Ele obedeceu imediatamente a
                        Eli, mesmo sem entender completamente o que estava
                        acontecendo.
                      </p>
                    </div>
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    A Persistência de Deus
                  </h3>

                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    Isso aconteceu três vezes! A cada chamado, Samuel corria até
                    Eli com prontidão. Na terceira vez, Eli compreendeu que era
                    o Senhor quem estava chamando o menino.
                  </p>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {makeVersesClickable(
                      "Eli orientou Samuel: 'Vai deitar-te; e há de ser que, se te chamar, dirás: Fala, Senhor, porque o teu servo ouve.' Que bela lição sobre como devemos responder a Deus! Esta atitude também é vista em Isaías 6:8, onde o profeta se oferece para servir."
                    )}
                  </p>

                  {/* Atividade Interativa */}
                  <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <h4 className="mb-4 flex items-center font-semibold text-foreground">
                      <Target className="mr-2 h-5 w-5 text-primary" />
                      Atividade Prática: Memorização
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Vamos aprender a resposta de Samuel. Repita com sua
                      criança:
                    </p>
                    <div className="rounded-lg border-l-4 border-primary bg-background p-4">
                      <p className="text-center text-lg font-medium">
                        "Fala, Senhor, porque o teu servo ouve"
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      💡 Dica: Pratique esta frase durante as orações
                      familiares!
                    </p>
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Aplicação para Hoje
                  </h3>

                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    Como pais, podemos aprender com Samuel sobre a importância
                    de ter um coração disposto a ouvir e obedecer. Quando
                    orientamos nossos filhos, esperamos a mesma prontidão que
                    Samuel demonstrou.
                  </p>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-success/20 bg-success/10 p-4">
                      <h5 className="mb-2 font-semibold text-success">
                        Para as Crianças
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Obedeça aos pais prontamente, mesmo quando não entender
                        completamente o porquê.
                      </p>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
                      <h5 className="mb-2 font-semibold text-primary">
                        Para os Pais
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Seja paciente ao ensinar, lembrando que às vezes
                        precisamos explicar várias vezes.
                      </p>
                    </div>
                  </div>
                </article>

                {/* Navegação da Seção */}
                <div className="flex items-center justify-between border-t pt-8">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Seção Anterior
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Headphones className="mr-2 h-4 w-4" />
                      Áudio
                    </Button>
                    <Button
                      onClick={handleCompleteSection}
                      className="bg-gradient-primary"
                    >
                      Completar Seção
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Star className="h-5 w-5" />
                  <span>Próximos Passos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-accent/10 p-4">
                    <h4 className="mb-2 font-semibold">Durante a Semana</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Pratique a frase de Samuel nas orações</li>
                      <li>• Conte a história para outros familiares</li>
                      <li>• Observe momentos de obediência em casa</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-4">
                    <h4 className="mb-2 font-semibold">Próxima Lição</h4>
                    <p className="mb-2 text-sm text-muted-foreground">
                      "A Resposta de Samuel"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aprenda como Samuel respondeu ao chamado de Deus e o que
                      isso significa para nós.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Informações do Versículo */}
        <Dialog open={showVerseModal} onOpenChange={setShowVerseModal}>
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
            {selectedVerse && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xl">{selectedVerse.reference}</span>
                      <div className="mt-1 flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedVerse.theme}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {selectedVerse.book}
                        </Badge>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>{selectedVerse.context}</DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] overflow-y-auto">
                  <div className="space-y-6 pr-4">
                    {/* Texto do Versículo */}
                    <div className="bg-gradient-primary/10 rounded-lg border-l-4 border-primary p-6">
                      <div className="flex items-start space-x-3">
                        <Quote className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                        <div>
                          <p className="mb-2 text-lg font-medium leading-relaxed">
                            "{selectedVerse.text}"
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedVerse.reference}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Explicação */}
                    <div>
                      <h4 className="mb-3 flex items-center font-semibold">
                        <Info className="mr-2 h-4 w-4 text-primary" />
                        Explicação
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {selectedVerse.explanation}
                      </p>
                    </div>

                    {/* Referências Cruzadas */}
                    <div>
                      <h4 className="mb-3 flex items-center font-semibold">
                        <LinkIcon className="mr-2 h-4 w-4 text-primary" />
                        Referências Cruzadas
                        <Badge variant="outline" className="ml-2 text-xs">
                          {selectedVerse.crossReferences.length} encontradas
                        </Badge>
                      </h4>
                      <div className="space-y-3">
                        {selectedVerse.crossReferences.map(
                          (ref: any, index: number) => (
                            <div
                              key={index}
                              className="rounded-lg border bg-muted/30 p-4"
                            >
                              <div className="mb-2 flex items-start justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {ref.reference}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-1"
                                  onClick={() => {
                                    // Aqui poderia navegar para o versículo
                                    toast({
                                      title: 'Navegação',
                                      description: `Navegando para ${ref.reference}`,
                                    });
                                  }}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="mb-2 text-sm italic">
                                "{ref.text}"
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {ref.context}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Aplicações Práticas */}
                    <div>
                      <h4 className="mb-3 flex items-center font-semibold">
                        <Target className="mr-2 h-4 w-4 text-primary" />
                        Aplicações Práticas
                      </h4>
                      <div className="grid gap-2">
                        {selectedVerse.applications.map(
                          (application: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 rounded-lg bg-accent/10 p-3"
                            >
                              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                              <p className="text-sm text-muted-foreground">
                                {application}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <Separator />
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Favoritar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Versículo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartilhar
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Adicionar Nota
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LessonContent;
