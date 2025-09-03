import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  TrendingUp,
  BookOpen,
  Heart,
  MessageSquare,
  Share2,
  Filter,
  ArrowLeft,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  Home,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');

  // Mock data dos artigos
  const blogPosts = [
    {
      id: 1,
      title: 'Como Ensinar Valores Cristãos no Dia a Dia',
      excerpt:
        'Descubra estratégias práticas para incorporar valores cristãos na rotina familiar, criando momentos de aprendizado natural e significativo.',
      content:
        'A educação cristã não acontece apenas nos domingos ou durante os momentos de oração...',
      author: 'Pastora Maria Silva',
      category: 'Orientação aos Pais',
      tags: ['valores', 'família', 'educação', 'rotina'],
      publishedDate: '2024-01-15',
      readTime: '8 min',
      image: '/placeholder.svg',
      likes: 156,
      comments: 23,
      featured: true,
      views: 1234,
    },
    {
      id: 2,
      title: 'A Importância da Oração em Família',
      excerpt:
        'Explore como criar momentos de oração genuínos que conectem toda a família e fortaleçam os laços espirituais.',
      content:
        'A oração familiar é um dos pilares mais importantes na educação cristã...',
      author: 'Pastor João Santos',
      category: 'Vida Espiritual',
      tags: ['oração', 'família', 'espiritualidade', 'união'],
      publishedDate: '2024-01-12',
      readTime: '6 min',
      image: '/placeholder.svg',
      likes: 203,
      comments: 31,
      featured: false,
      views: 987,
    },
    {
      id: 3,
      title: 'Desenvolvendo a Fé das Crianças através de Histórias',
      excerpt:
        'Aprenda técnicas de storytelling que tornam as histórias bíblicas mais envolventes e memoráveis para os pequenos.',
      content:
        'As histórias têm um poder transformador na vida das crianças...',
      author: 'Educadora Ana Costa',
      category: 'Educação Infantil',
      tags: ['histórias', 'crianças', 'aprendizado', 'criatividade'],
      publishedDate: '2024-01-10',
      readTime: '10 min',
      image: '/placeholder.svg',
      likes: 178,
      comments: 45,
      featured: true,
      views: 1456,
    },
    {
      id: 4,
      title: 'Lidando com Perguntas Difíceis das Crianças sobre Fé',
      excerpt:
        'Como responder de forma adequada quando as crianças fazem perguntas desafiadoras sobre Deus, sofrimento e propósito.',
      content:
        'É natural que as crianças façam perguntas profundas sobre a fé...',
      author: 'Dr. Carlos Mendes',
      category: 'Orientação aos Pais',
      tags: ['perguntas', 'dúvidas', 'diálogo', 'sabedoria'],
      publishedDate: '2024-01-08',
      readTime: '12 min',
      image: '/placeholder.svg',
      likes: 234,
      comments: 52,
      featured: false,
      views: 1678,
    },
    {
      id: 5,
      title: 'Criando Tradições Familiares Significativas',
      excerpt:
        'Ideias práticas para estabelecer tradições familiares que fortaleçam a fé e criem memórias duradouras.',
      content: 'As tradições familiares são pontes que conectam gerações...',
      author: 'Família Oliveira',
      category: 'Vida Familiar',
      tags: ['tradições', 'memórias', 'celebrações', 'herança'],
      publishedDate: '2024-01-05',
      readTime: '7 min',
      image: '/placeholder.svg',
      likes: 167,
      comments: 28,
      featured: false,
      views: 892,
    },
    {
      id: 6,
      title: 'Tecnologia e Fé: Equilibrando o Mundo Digital',
      excerpt:
        'Navegue os desafios de criar filhos piedosos na era digital, estabelecendo limites saudáveis e usando a tecnologia como ferramenta.',
      content: 'Vivemos em uma era digital que apresenta desafios únicos...',
      author: 'Pastor Marcos Tech',
      category: 'Modernidade',
      tags: ['tecnologia', 'limites', 'digital', 'equilíbrio'],
      publishedDate: '2024-01-03',
      readTime: '9 min',
      image: '/placeholder.svg',
      likes: 189,
      comments: 37,
      featured: true,
      views: 1123,
    },
  ];

  const categories = [
    {
      id: 'all',
      name: 'Todos os Artigos',
      count: blogPosts.length,
      icon: BookOpen,
    },
    { id: 'orientacao', name: 'Orientação aos Pais', count: 2, icon: Users },
    { id: 'espiritual', name: 'Vida Espiritual', count: 1, icon: Heart },
    { id: 'educacao', name: 'Educação Infantil', count: 1, icon: Target },
    { id: 'familia', name: 'Vida Familiar', count: 1, icon: Home },
    { id: 'modernidade', name: 'Modernidade', count: 1, icon: Sparkles },
  ];

  const popularTags = [
    'valores',
    'família',
    'oração',
    'crianças',
    'educação',
    'fé',
    'tradições',
    'tecnologia',
    'histórias',
    'aprendizado',
  ];

  // Filtros
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      post.category
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(selectedCategory.replace('orientacao', 'orientação'));

    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              to="/pais"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Área dos Pais
            </Link>

            <h1 className="mb-4 text-4xl font-bold">
              Blog{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Família Cristã
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Orientações, dicas práticas e insights para pais que desejam
              educar seus filhos nos valores cristãos
            </p>

            {/* Busca principal */}
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-12 pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categorias */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="mr-2 h-5 w-5" />
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex w-full items-center justify-between rounded-lg p-3 transition-colors ${
                          selectedCategory === category.id
                            ? 'border border-primary/20 bg-primary/10 text-primary'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Tags Populares */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Tag className="mr-2 h-5 w-5" />
                    Tags Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? '' : tag)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          selectedTag === tag
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Artigos em Destaque */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Em Destaque
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredPosts.slice(0, 3).map(post => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group block"
                    >
                      <div className="space-y-2">
                        <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Filtros ativos */}
            {(searchTerm || selectedCategory !== 'all' || selectedTag) && (
              <div className="mb-6 rounded-lg bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Filtros ativos:</span>
                    {searchTerm && (
                      <Badge variant="outline">Busca: "{searchTerm}"</Badge>
                    )}
                    {selectedCategory !== 'all' && (
                      <Badge variant="outline">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </Badge>
                    )}
                    {selectedTag && (
                      <Badge variant="outline">#{selectedTag}</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedTag('');
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              </div>
            )}

            {/* Lista de Artigos */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">
                      Nenhum artigo encontrado
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Tente ajustar seus filtros ou buscar por outros termos.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedTag('');
                      }}
                    >
                      Ver todos os artigos
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredPosts.map(post => (
                  <Card
                    key={post.id}
                    className="group transition-all duration-300 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Imagem do artigo */}
                        <div className="bg-gradient-primary/10 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>

                        {/* Conteúdo */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  {post.category}
                                </Badge>
                                {post.featured && (
                                  <Badge
                                    variant="outline"
                                    className="border-primary/20 bg-primary/10 text-xs text-primary"
                                  >
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    Destaque
                                  </Badge>
                                )}
                              </div>

                              <Link to={`/blog/${post.id}`}>
                                <h3 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
                                  {post.title}
                                </h3>
                              </Link>

                              <p className="mb-4 line-clamp-2 text-muted-foreground">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          {/* Metadados */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    post.publishedDate
                                  ).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Link to={`/blog/${post.id}`}>
                                  <Button size="sm">Ler artigo</Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.slice(0, 4).map(tag => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="rounded bg-muted/30 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Paginação simula */}
            {filteredPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-primary text-primary-foreground"
                  >
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Próximo</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
