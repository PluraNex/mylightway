import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  BookOpen, 
  Search, 
  Star, 
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Link as LinkIcon,
  Highlighter,
  MessageSquare,
  Settings,
  Menu,
  ArrowLeft,
  Target,
  BarChart3,
  Users,
  Tags,
  Globe,
  ArrowLeftRight,
  FileText,
  TrendingUp,
  CheckSquare,
  Eye,
  Share2,
  Download,
  Shuffle,
  Library,
  Clock,
  Calendar,
  User,
  Lightbulb,
  Navigation,
  Bot,
  Wand2,
  Brain,
  Sparkles,
  Zap,
  PenTool,
  FileEdit,
  RefreshCw,
  MessageCircle,
  Copy,
  Send,
  Cpu,
  Network
} from "lucide-react";
import { Link } from "react-router-dom";

const BibleStudy = () => {
  // States principais
  const [selectedBook, setSelectedBook] = useState("genesis");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersion] = useState("acf");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [themeSearch, setThemeSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showCrossReferences, setShowCrossReferences] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("read");
  const [newComment, setNewComment] = useState("");
  
  // Estados para funcionalidades de IA
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [aiIsLoading, setAiIsLoading] = useState(false);
  const [customText, setCustomText] = useState("");
  const [autoReferences, setAutoReferences] = useState<Array<{reference: string, verse: string, context: string}>>([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [textAnalysisMode, setTextAnalysisMode] = useState<"verse" | "theme" | "custom">("verse");

  // Mock data estruturado baseado nos endpoints
  const bibleVersions = [
    { id: "acf", name: "Almeida Corrigida Fiel", language: "pt" },
    { id: "nvi", name: "Nova Versão Internacional", language: "pt" },
    { id: "ntlh", name: "Nova Tradução na Linguagem de Hoje", language: "pt" },
    { id: "kjv", name: "King James Version", language: "en" },
    { id: "esv", name: "English Standard Version", language: "en" }
  ];

  const bibleBooks = {
    "Antigo Testamento": [
      { id: "genesis", name: "Gênesis", chapters: 50, author: "Moisés", verses: 1533 },
      { id: "exodus", name: "Êxodo", chapters: 40, author: "Moisés", verses: 1213 },
      { id: "leviticus", name: "Levítico", chapters: 27, author: "Moisés", verses: 859 },
      { id: "numbers", name: "Números", chapters: 36, author: "Moisés", verses: 1288 },
      { id: "deuteronomy", name: "Deuteronômio", chapters: 34, author: "Moisés", verses: 959 },
      { id: "psalms", name: "Salmos", chapters: 150, author: "Davi e outros", verses: 2461 },
      { id: "proverbs", name: "Provérbios", chapters: 31, author: "Salomão", verses: 915 },
      { id: "ecclesiastes", name: "Eclesiastes", chapters: 12, author: "Salomão", verses: 222 },
      { id: "isaiah", name: "Isaías", chapters: 66, author: "Isaías", verses: 1292 }
    ],
    "Novo Testamento": [
      { id: "matthew", name: "Mateus", chapters: 28, author: "Mateus", verses: 1071 },
      { id: "mark", name: "Marcos", chapters: 16, author: "Marcos", verses: 678 },
      { id: "luke", name: "Lucas", chapters: 24, author: "Lucas", verses: 1151 },
      { id: "john", name: "João", chapters: 21, author: "João", verses: 879 },
      { id: "acts", name: "Atos", chapters: 28, author: "Lucas", verses: 1007 },
      { id: "romans", name: "Romanos", chapters: 16, author: "Paulo", verses: 433 },
      { id: "ephesians", name: "Efésios", chapters: 6, author: "Paulo", verses: 155 },
      { id: "philippians", name: "Filipenses", chapters: 4, author: "Paulo", verses: 104 },
      { id: "revelation", name: "Apocalipse", chapters: 22, author: "João", verses: 404 }
    ]
  };

  const bibleThemes = [
    { id: 1, name: "Amor de Deus", description: "Versículos sobre o amor incondicional de Deus", verseCount: 156 },
    { id: 2, name: "Fé e Confiança", description: "Ensinamentos sobre ter fé em Deus", verseCount: 243 },
    { id: 3, name: "Perdão", description: "Versículos sobre perdão divino e humano", verseCount: 89 },
    { id: 4, name: "Esperança", description: "Mensagens de esperança e promessas", verseCount: 134 },
    { id: 5, name: "Salvação", description: "Versículos sobre a salvação em Cristo", verseCount: 198 },
    { id: 6, name: "Oração", description: "Ensinamentos sobre a vida de oração", verseCount: 167 },
    { id: 7, name: "Sabedoria", description: "Provérbios e ensinamentos sobre sabedoria", verseCount: 201 },
    { id: 8, name: "Família", description: "Orientações para a vida familiar cristã", verseCount: 78 },
    { id: 9, name: "Obediência", description: "Versículos sobre obediência a Deus", verseCount: 112 },
    { id: 10, name: "Prosperidade", description: "Bênçãos e prosperidade segundo Deus", verseCount: 95 }
  ];

  const currentBookData = Object.values(bibleBooks).flat().find(book => book.id === selectedBook);
  const currentVersion = bibleVersions.find(v => v.id === selectedVersion);

  // Mock verses com estrutura mais completa
  const verses = [
    { 
      id: 1,
      number: 1, 
      text: "No princípio, Deus criou os céus e a terra.",
      crossReferences: [
        { reference: "João 1:1", text: "No princípio era o Verbo, e o Verbo estava com Deus..." },
        { reference: "Hebreus 11:3", text: "Pela fé, entendemos que foi o universo formado..." },
        { reference: "Salmos 33:6", text: "Pela palavra do Senhor foram feitos os céus..." }
      ],
      themes: [1, 7], // Amor de Deus, Sabedoria
      comments: [
        { id: 1, author: "João Silva", text: "Este versículo estabelece a base de toda nossa fé.", date: "2024-01-15" },
        { id: 2, author: "Maria Santos", text: "A palavra 'princípio' aqui é fundamental para entender...", date: "2024-01-10" }
      ],
      favorites: 1243,
      highlights: 856
    },
    { 
      id: 2,
      number: 2, 
      text: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas.",
      crossReferences: [
        { reference: "Jeremias 4:23", text: "Olhei para a terra, e eis que estava sem forma e vazia..." },
        { reference: "Isaías 45:18", text: "Porque assim diz o Senhor que criou os céus..." }
      ],
      themes: [1, 7],
      comments: [
        { id: 3, author: "Pedro Costa", text: "O Espírito de Deus já estava presente desde o início.", date: "2024-01-12" }
      ],
      favorites: 789,
      highlights: 567
    },
    { 
      id: 3,
      number: 3, 
      text: "Disse Deus: 'Haja luz', e houve luz.",
      crossReferences: [
        { reference: "2 Coríntios 4:6", text: "Porque Deus, que disse: Das trevas resplandecerá a luz..." },
        { reference: "Salmos 33:9", text: "Porque falou, e tudo se fez; mandou, e logo tudo apareceu." },
        { reference: "João 1:5", text: "E a luz resplandece nas trevas, e as trevas não a compreenderam." }
      ],
      themes: [1, 4, 7], // Amor, Esperança, Sabedoria
      comments: [
        { id: 4, author: "Ana Oliveira", text: "O poder da palavra de Deus é absoluto e criativo.", date: "2024-01-14" },
        { id: 5, author: "Carlos Lima", text: "A luz física aqui prefigura Cristo, a luz do mundo.", date: "2024-01-13" }
      ],
      favorites: 1567,
      highlights: 1234
    }
  ];

  const bookStatistics = {
    totalVerses: 1533,
    totalChapters: 50,
    averageVersesPerChapter: 30.7,
    themes: ["Criação", "Família", "Aliança", "Promessas"],
    readingTime: "4h 30min",
    difficulty: "Intermediário",
    popularVerses: ["1:1", "1:27", "3:15", "12:1-3"]
  };

  const recommendedVerses = [
    { reference: "João 3:16", text: "Porque Deus amou o mundo de tal maneira...", theme: "Amor de Deus" },
    { reference: "Romanos 8:28", text: "E sabemos que todas as coisas contribuem...", theme: "Esperança" },
    { reference: "Filipenses 4:13", text: "Posso todas as coisas naquele que me fortalece.", theme: "Fé e Confiança" }
  ];

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,;:!?]/g, '').toLowerCase();
    setSelectedWord(cleanWord);
    setShowCrossReferences(true);
  };

  const highlightVerse = (text: string) => {
    const words = text.split(' ');
    const importantWords = ['deus', 'senhor', 'cristo', 'jesus', 'espírito', 'pai', 'filho', 'amor', 'fé', 'esperança'];
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,;:!?]/g, '').toLowerCase();
      const isImportant = importantWords.includes(cleanWord);
      
      return (
        <span
          key={index}
          className={`${isImportant ? 'cursor-pointer hover:bg-primary/10 hover:text-primary rounded px-0.5 transition-colors font-medium' : ''}`}
          onClick={() => isImportant && handleWordClick(word)}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  // Mock AI data - Simula funcionalidades de IA
  const mockAIInsights = [
    "Este versículo estabelece o fundamento teológico da criação ex-nihilo (do nada), conceito central no cristianismo.",
    "A palavra hebraica 'bara' (criar) é usada exclusivamente para ações divinas no Antigo Testamento.",
    "A expressão 'céus e terra' é um merismo hebraico que indica totalidade - todo o universo.",
    "Este versículo conecta-se com João 1:1-3, estabelecendo Cristo como agente da criação."
  ];

  const mockAIThemeAnalysis = {
    "Criação": {
      verses: ["Gênesis 1:1", "João 1:1-3", "Hebreus 11:3", "Salmos 33:6"],
      significance: "A criação revela o poder soberano de Deus e Sua ordem estabelecida.",
      connections: ["Poder de Deus", "Soberania", "Ordem Divina"]
    },
    "Poder Divino": {
      verses: ["Isaías 40:26", "Jeremias 32:17", "Romanos 1:20"],
      significance: "O poder criativo demonstra a omnipotência divina.",
      connections: ["Criação", "Milagres", "Providência"]
    }
  };

  const mockAutoReferences = [
    { reference: "João 1:1", verse: "No princípio era o Verbo...", context: "Paralelo teológico sobre o princípio" },
    { reference: "Hebreus 11:3", verse: "Pela fé entendemos...", context: "Criação pela palavra divina" },
    { reference: "Salmos 33:6", verse: "Pela palavra do Senhor...", context: "Poder criativo da palavra" }
  ];

  const mockAIQuestions = [
    "Qual o significado teológico da criação 'ex-nihilo'?",
    "Como este versículo se relaciona com a doutrina da Trindade?",
    "Quais são os paralelos entre Gênesis 1:1 e João 1:1?",
    "Como a ciência moderna dialoga com o relato da criação?"
  ];

  // Funções de IA simuladas
  const analyzeTextWithAI = async (text: string, mode: string) => {
    setAiIsLoading(true);
    // Simula processamento de IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (mode) {
      case "verse":
        setAiInsights(mockAIInsights);
        setAiAnalysis("Análise concluída! Este versículo apresenta elementos teológicos fundamentais.");
        break;
      case "theme":
        setAiInsights([
          "Tema identificado: Criação Divina",
          "Conexões encontradas com 47 outros versículos",
          "Significado: Estabelece a base da fé cristã na criação"
        ]);
        setAiAnalysis("Análise temática concluída com conexões identificadas.");
        break;
      case "custom":
        const detectedRefs = text.toLowerCase().includes("criação") ? mockAutoReferences : [];
        setAutoReferences(detectedRefs);
        setAiAnalysis("Texto analisado! Referências bíblicas foram detectadas automaticamente.");
        break;
    }
    setAiIsLoading(false);
  };

  const askAIQuestion = async (question: string) => {
    setAiIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "A criação 'ex-nihilo' significa que Deus criou do nada, demonstrando Seu poder absoluto e transcendência sobre a matéria.",
      "Este versículo revela a unidade da Trindade na obra criativa: o Pai como fonte, o Filho como agente (João 1:3) e o Espírito como vivificador.",
      "Ambos os versículos usam 'princípio' estabelecendo Cristo como eterno e agente da criação, conectando Antigo e Novo Testamento."
    ];
    
    setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
    setAiIsLoading(false);
  };

  const handleSaveComment = () => {
    if (newComment.trim()) {
      // Aqui conectará com o endpoint save-references/
      console.log("Salvando comentário:", newComment);
      setNewComment("");
      setShowComments(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header aprimorado */}
      <div className="border-b bg-card/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/pais" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Área dos Pais</span>
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold hidden sm:inline">Estudo Bíblico Avançado</h1>
                  <p className="text-xs text-muted-foreground hidden lg:inline">
                    {currentBookData?.name} {selectedChapter} • {currentVersion?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Versão da Bíblia */}
              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-32 hidden md:flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bibleVersions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.id.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Busca avançada */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar versículos, temas, palavras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-72 pl-10"
                />
              </div>
              
              <Button variant="ghost" size="icon" title="Favoritos">
                <Bookmark className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" title="Estatísticas" onClick={() => setShowStatistics(true)}>
                <BarChart3 className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" title="Configurações">
                <Settings className="w-5 h-5" />
              </Button>

              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Navegação Bíblica</SheetTitle>
                    <SheetDescription>Acesso completo às ferramentas de estudo</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar expandida */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Navegação de Livros */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Library className="w-5 h-5" />
                    <span>Navegação</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Livro</label>
                      <Select value={selectedBook} onValueChange={setSelectedBook}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(bibleBooks).map(([testament, books]) => (
                            <div key={testament}>
                              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                                {testament}
                              </div>
                              {books.map((book) => (
                                <SelectItem key={book.id} value={book.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{book.name}</span>
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      {book.chapters}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Capítulo</label>
                      <Select value={selectedChapter.toString()} onValueChange={(value) => setSelectedChapter(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-48">
                            {Array.from({ length: currentBookData?.chapters || 1 }, (_, i) => i + 1).map((chapter) => (
                              <SelectItem key={chapter} value={chapter.toString()}>
                                Capítulo {chapter}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>

                    {currentBookData && (
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Autor:</span>
                            <span className="font-medium">{currentBookData.author}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Versículos:</span>
                            <span className="font-medium">{currentBookData.verses}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Temas Bíblicos */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Tags className="w-5 h-5" />
                    <span>Temas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input
                      placeholder="Buscar temas..."
                      value={themeSearch}
                      onChange={(e) => setThemeSearch(e.target.value)}
                      className="h-8"
                    />
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {bibleThemes
                          .filter(theme => theme.name.toLowerCase().includes(themeSearch.toLowerCase()))
                          .slice(0, 8)
                          .map((theme) => (
                          <div
                            key={theme.id}
                            className={`p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedTheme === theme.id.toString() 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => setSelectedTheme(theme.id.toString())}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{theme.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {theme.verseCount}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>

              {/* Ferramentas Rápidas */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Navigation className="w-5 h-5" />
                    <span>Ferramentas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setShowComparison(true)}>
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Comparar Versões
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Shuffle className="w-4 h-4 mr-2" />
                      Versículo Aleatório
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Versículos do Dia
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Mais Populares
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Conteúdo Principal com Abas */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="read" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Leitura</span>
                </TabsTrigger>
                <TabsTrigger value="study" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Estudo</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">IA</span>
                </TabsTrigger>
                <TabsTrigger value="themes" className="flex items-center space-x-2">
                  <Tags className="w-4 h-4" />
                  <span className="hidden sm:inline">Temas</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Ferramentas</span>
                </TabsTrigger>
              </TabsList>

              {/* Aba de Leitura */}
              <TabsContent value="read" className="space-y-6">
                {/* Header do Capítulo */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center space-x-3">
                          <span>{currentBookData?.name} {selectedChapter}</span>
                          <Badge variant="outline">{currentVersion?.id.toUpperCase()}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {verses.length} versículos • Tempo de leitura: ~{Math.ceil(verses.length * 0.3)} min
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled={selectedChapter <= 1}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" disabled={selectedChapter >= (currentBookData?.chapters || 1)}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Texto Bíblico Aprimorado */}
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {verses.map((verse) => (
                        <div
                          key={verse.number}
                          className={`group relative p-6 rounded-xl transition-all duration-200 ${
                            selectedVerse === verse.number 
                              ? 'bg-primary/5 border-2 border-primary/20 shadow-lg' 
                              : 'hover:bg-muted/30 border border-transparent'
                          }`}
                          onClick={() => setSelectedVerse(selectedVerse === verse.number ? null : verse.number)}
                        >
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <Badge 
                                variant="outline" 
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${
                                  selectedVerse === verse.number 
                                    ? 'bg-primary text-primary-foreground border-primary' 
                                    : 'hover:bg-primary/10'
                                }`}
                              >
                                {verse.number}
                              </Badge>
                            </div>
                            
                            <div className="flex-1 space-y-4">
                              <p className="text-lg leading-relaxed cursor-pointer font-serif">
                                {highlightVerse(verse.text)}
                              </p>

                              {/* Estatísticas do versículo */}
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-3 h-3" />
                                  <span>{verse.favorites}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Highlighter className="w-3 h-3" />
                                  <span>{verse.highlights}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="w-3 h-3" />
                                  <span>{verse.comments.length}</span>
                                </div>
                              </div>
                              
                              {selectedVerse === verse.number && (
                                <div className="space-y-6 pt-6 border-t border-muted">
                                  {/* Ações do versículo */}
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">AÇÕES</h4>
                                    <div className="flex flex-wrap gap-2">
                                      <Button variant="outline" size="sm">
                                        <Heart className="w-3 h-3 mr-1" />
                                        Favoritar
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Highlighter className="w-3 h-3 mr-1" />
                                        Destacar
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => setShowComments(true)}>
                                        <MessageSquare className="w-3 h-3 mr-1" />
                                        Comentar
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Share2 className="w-3 h-3 mr-1" />
                                        Compartilhar
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <ArrowLeftRight className="w-3 h-3 mr-1" />
                                        Comparar
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Temas relacionados */}
                                  {verse.themes.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold text-sm text-muted-foreground mb-3">TEMAS</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {verse.themes.map((themeId) => {
                                          const theme = bibleThemes.find(t => t.id === themeId);
                                          return theme ? (
                                            <Badge key={themeId} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                              {theme.name}
                                            </Badge>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Referências cruzadas */}
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">REFERÊNCIAS CRUZADAS</h4>
                                    <div className="space-y-2">
                                      {verse.crossReferences.slice(0, 3).map((ref, index) => (
                                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                                          <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                              <Badge variant="outline" className="mb-2 text-xs">{ref.reference}</Badge>
                                              <p className="text-sm leading-relaxed italic">"{ref.text}"</p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                              <Eye className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                      {verse.crossReferences.length > 3 && (
                                        <Button variant="outline" size="sm" className="w-full">
                                          Ver todas as {verse.crossReferences.length} referências
                                        </Button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Comentários */}
                                  <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">COMENTÁRIOS RECENTES</h4>
                                    <div className="space-y-3">
                                      {verse.comments.slice(0, 2).map((comment) => (
                                        <div key={comment.id} className="p-3 bg-muted/20 rounded-lg">
                                          <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                              <Badge variant="secondary" className="text-xs">{comment.author}</Badge>
                                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                                            </div>
                                          </div>
                                          <p className="text-sm">{comment.text}</p>
                                        </div>
                                      ))}
                                      {verse.comments.length > 2 && (
                                        <Button variant="outline" size="sm" className="w-full">
                                          Ver todos os {verse.comments.length} comentários
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Footer */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Button variant="outline" disabled={selectedChapter <= 1}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Capítulo Anterior
                      </Button>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{selectedChapter} de {currentBookData?.chapters}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{verses.length} versículos</span>
                      </div>
                      
                      <Button variant="outline" disabled={selectedChapter >= (currentBookData?.chapters || 1)}>
                        Próximo Capítulo
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Estudo */}
              <TabsContent value="study" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Versículos Recomendados */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>Versículos Recomendados</span>
                      </CardTitle>
                      <CardDescription>Baseado em seus estudos anteriores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recommendedVerses.map((verse, index) => (
                          <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 cursor-pointer">
                            <Badge variant="outline" className="mb-2">{verse.reference}</Badge>
                            <p className="text-sm leading-relaxed mb-2">"{verse.text}"</p>
                            <Badge variant="secondary" className="text-xs">{verse.theme}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Plano de Leitura */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Plano de Leitura</span>
                      </CardTitle>
                      <CardDescription>Acompanhe seu progresso diário</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progresso Semanal</span>
                          <span className="text-sm text-muted-foreground">5/7 dias</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '71%' }}></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Hoje: Gênesis 1-2</span>
                            <CheckSquare className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Amanhã: Gênesis 3-4</span>
                            <Clock className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba de Inteligência Artificial */}
              <TabsContent value="ai" className="space-y-6">
                <div className="grid gap-6">
                  {/* Header da IA */}
                  <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Bot className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-2xl">Assistente de Estudo Bíblico IA</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Powered by AI
                            </Badge>
                            <Badge variant="secondary" className="text-xs">Beta</Badge>
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-base">
                        Explore as Escrituras com análises inteligentes, criação de textos personalizados e detecção automática de referências bíblicas.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Painel de Análise com IA */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-primary" />
                          <span>Análise Inteligente</span>
                        </CardTitle>
                        <CardDescription>
                          Analise versículos, temas ou textos personalizados com IA
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Seletor de modo de análise */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">Modo de Análise</label>
                          <Select value={textAnalysisMode} onValueChange={(value: "verse" | "theme" | "custom") => setTextAnalysisMode(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="verse">
                                <div className="flex items-center space-x-2">
                                  <BookOpen className="w-4 h-4" />
                                  <span>Analisar Versículo Atual</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="theme">
                                <div className="flex items-center space-x-2">
                                  <Tags className="w-4 h-4" />
                                  <span>Análise Temática</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="custom">
                                <div className="flex items-center space-x-2">
                                  <PenTool className="w-4 h-4" />
                                  <span>Texto Personalizado</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Input para texto personalizado */}
                        {textAnalysisMode === "custom" && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Seu Texto</label>
                            <Textarea
                              placeholder="Digite seu texto para análise e detecção automática de referências bíblicas..."
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              className="min-h-32"
                            />
                          </div>
                        )}

                        {/* Botão de análise */}
                        <Button 
                          onClick={() => {
                            const text = textAnalysisMode === "custom" ? customText : verses[0]?.text || "";
                            analyzeTextWithAI(text, textAnalysisMode);
                          }}
                          disabled={aiIsLoading || (textAnalysisMode === "custom" && !customText.trim())}
                          className="w-full"
                        >
                          {aiIsLoading ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Analisando...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Iniciar Análise IA
                            </>
                          )}
                        </Button>

                        {/* Resultados da análise */}
                        {aiAnalysis && (
                          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border animate-fade-in">
                            <div className="flex items-start space-x-2">
                              <div className="p-1 bg-primary/10 rounded">
                                <Cpu className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-2">Resultado da Análise</h4>
                                <p className="text-sm text-muted-foreground">{aiAnalysis}</p>
                              </div>
                            </div>

                            {/* Insights gerados */}
                            {aiInsights.length > 0 && (
                              <div>
                                <h5 className="font-medium text-sm mb-2 flex items-center">
                                  <Lightbulb className="w-4 h-4 mr-1" />
                                  Insights Descobertos
                                </h5>
                                <div className="space-y-2">
                                  {aiInsights.map((insight, index) => (
                                    <div key={index} className="p-3 bg-background/50 rounded border border-primary/10">
                                      <p className="text-sm">{insight}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Referências detectadas */}
                            {autoReferences.length > 0 && (
                              <div>
                                <h5 className="font-medium text-sm mb-2 flex items-center">
                                  <Network className="w-4 h-4 mr-1" />
                                  Referências Detectadas
                                </h5>
                                <div className="space-y-2">
                                  {autoReferences.map((ref, index) => (
                                    <div key={index} className="p-3 bg-background/50 rounded border border-secondary/20">
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <Badge variant="outline" className="mb-1 text-xs">{ref.reference}</Badge>
                                          <p className="text-sm italic mb-1">"{ref.verse}"</p>
                                          <p className="text-xs text-muted-foreground">{ref.context}</p>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                          <LinkIcon className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Chat com IA */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-primary" />
                          <span>Consultor Teológico IA</span>
                        </CardTitle>
                        <CardDescription>
                          Faça perguntas sobre teologia, interpretação e contexto bíblico
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Perguntas sugeridas */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">Perguntas Sugeridas</label>
                          <div className="space-y-2">
                            {mockAIQuestions.slice(0, 2).map((question, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-left h-auto p-3"
                                onClick={() => {
                                  setAiQuestion(question);
                                  askAIQuestion(question);
                                }}
                              >
                                <div className="flex items-start space-x-2">
                                  <Lightbulb className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                                  <span className="text-sm">{question}</span>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Input personalizado */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium mb-2 block">Sua Pergunta</label>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Digite sua pergunta teológica..."
                              value={aiQuestion}
                              onChange={(e) => setAiQuestion(e.target.value)}
                              className="flex-1"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !aiIsLoading && aiQuestion.trim()) {
                                  askAIQuestion(aiQuestion);
                                }
                              }}
                            />
                            <Button
                              onClick={() => askAIQuestion(aiQuestion)}
                              disabled={aiIsLoading || !aiQuestion.trim()}
                              size="icon"
                            >
                              {aiIsLoading ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Resposta da IA */}
                        {aiResponse && (
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
                            <div className="flex items-start space-x-3">
                              <div className="p-1 bg-primary/10 rounded">
                                <Bot className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-2">Resposta do Assistente</h4>
                                <p className="text-sm leading-relaxed">{aiResponse}</p>
                                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-primary/10">
                                  <Button variant="ghost" size="sm">
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copiar
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Share2 className="w-3 h-3 mr-1" />
                                    Compartilhar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Editor de Textos Personalizados */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileEdit className="w-5 h-5 text-primary" />
                        <span>Editor de Textos com IA</span>
                      </CardTitle>
                      <CardDescription>
                        Crie seus próprios textos com detecção automática de referências bíblicas e sugestões inteligentes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Editor principal */}
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Título do Texto</label>
                            <Input placeholder="Digite o título do seu estudo..." />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Conteúdo</label>
                            <Textarea
                              placeholder="Comece a escrever seu texto... A IA detectará automaticamente referências bíblicas e oferecerá sugestões enquanto você escreve."
                              className="min-h-48 resize-none"
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <Wand2 className="w-4 h-4 mr-1" />
                              Sugestões IA
                            </Button>
                            <Button variant="outline" size="sm">
                              <Network className="w-4 h-4 mr-1" />
                              Detectar Referências
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-1" />
                              Formatar Texto
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Exportar
                            </Button>
                          </div>
                        </div>

                        {/* Painel de assistência */}
                        <div className="space-y-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center space-x-1">
                                <Sparkles className="w-4 h-4" />
                                <span>Sugestões IA</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="text-xs text-muted-foreground">
                                {customText.length > 0 ? "Sugestões baseadas no seu texto:" : "Comece a escrever para ver sugestões"}
                              </div>
                              {customText.length > 20 && (
                                <div className="space-y-2">
                                  <div className="p-2 bg-muted/30 rounded text-xs">
                                    Considere adicionar: "Como diz em Romanos 8:28..."
                                  </div>
                                  <div className="p-2 bg-muted/30 rounded text-xs">
                                    Referência relacionada: Filipenses 4:13
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center space-x-1">
                                <Network className="w-4 h-4" />
                                <span>Referências Auto-Detectadas</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-xs text-muted-foreground">
                                {autoReferences.length > 0 ? 
                                  `${autoReferences.length} referências encontradas` : 
                                  "Nenhuma referência detectada ainda"
                                }
                              </div>
                              {autoReferences.length > 0 && (
                                <div className="space-y-1 mt-2">
                                  {autoReferences.slice(0, 3).map((ref, index) => (
                                    <div key={index} className="text-xs p-2 bg-primary/5 rounded border border-primary/10">
                                      <Badge variant="outline" className="text-xs mb-1">{ref.reference}</Badge>
                                      <p className="text-muted-foreground">{ref.context}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba de Temas */}
              <TabsContent value="themes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Tags className="w-5 h-5" />
                      <span>Explorar por Temas</span>
                    </CardTitle>
                    <CardDescription>Descubra versículos organizados por temas bíblicos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {bibleThemes.slice(0, 8).map((theme) => (
                        <div
                          key={theme.id}
                          className="p-4 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => setSelectedTheme(theme.id.toString())}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{theme.name}</h3>
                            <Badge variant="outline">{theme.verseCount}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Ferramentas */}
              <TabsContent value="tools" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ferramentas de Análise</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setShowStatistics(true)}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Estatísticas do Livro
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setShowComparison(true)}>
                        <ArrowLeftRight className="w-4 h-4 mr-2" />
                        Comparar Versões
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Buscar por Autor
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Outras Traduções
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Exportar e Compartilhar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Capítulo
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar Estudo
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modal de Estatísticas */}
      <Dialog open={showStatistics} onOpenChange={setShowStatistics}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Estatísticas - {currentBookData?.name}</span>
            </DialogTitle>
            <DialogDescription>Análise detalhada do livro bíblico</DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Informações Gerais</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total de Versículos:</span>
                    <span className="font-medium">{bookStatistics.totalVerses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total de Capítulos:</span>
                    <span className="font-medium">{bookStatistics.totalChapters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Média por Capítulo:</span>
                    <span className="font-medium">{bookStatistics.averageVersesPerChapter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo de Leitura:</span>
                    <span className="font-medium">{bookStatistics.readingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dificuldade:</span>
                    <Badge variant="outline">{bookStatistics.difficulty}</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Temas Principais</h4>
                <div className="flex flex-wrap gap-2">
                  {bookStatistics.themes.map((theme, index) => (
                    <Badge key={index} variant="secondary">{theme}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Versículos Populares</h4>
                <div className="flex flex-wrap gap-2">
                  {bookStatistics.popularVerses.map((verse, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {verse}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Comentários */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Adicionar Comentário</span>
            </DialogTitle>
            <DialogDescription>
              Compartilhe suas reflexões sobre este versículo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Digite seu comentário aqui..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24"
            />
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowComments(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveComment}>
                Salvar Comentário
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Comparação */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ArrowLeftRight className="w-5 h-5" />
              <span>Comparar Versões - {currentBookData?.name} {selectedChapter}:1</span>
            </DialogTitle>
            <DialogDescription>Compare diferentes traduções bíblicas</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {bibleVersions.slice(0, 3).map((version) => (
              <Card key={version.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{version.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed italic">
                    "No princípio, Deus criou os céus e a terra."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BibleStudy;