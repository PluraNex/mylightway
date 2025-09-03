import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Copy,
  Facebook,
  Twitter,
  Send,
  ThumbsUp,
  Quote,
  Lightbulb,
  Target,
  Users,
  BookOpen,
  Star,
  Eye,
  Tag
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { postId } = useParams();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Maria Santos",
      content: "Excelente artigo! Tenho aplicado essas dicas com meus filhos e vejo uma diferença significativa no comportamento deles.",
      date: "2024-01-16",
      likes: 12,
      replies: 2
    },
    {
      id: 2,
      author: "João Silva",
      content: "Muito útil! Como pastor, posso confirmar que essas estratégias realmente funcionam quando aplicadas com consistência e amor.",
      date: "2024-01-15",
      likes: 8,
      replies: 1
    }
  ]);

  // Mock data do artigo (em produção viria de uma API)
  const article = {
    id: 1,
    title: "Como Ensinar Valores Cristãos no Dia a Dia",
    excerpt: "Descubra estratégias práticas para incorporar valores cristãos na rotina familiar, criando momentos de aprendizado natural e significativo.",
    author: "Pastora Maria Silva",
    authorBio: "Pastora há 15 anos, mãe de 3 filhos e especialista em educação cristã infantil. Formada em Teologia e Pedagogia.",
    category: "Orientação aos Pais",
    tags: ["valores", "família", "educação", "rotina"],
    publishedDate: "2024-01-15",
    readTime: "8 min",
    likes: 156,
    comments: 23,
    views: 1234,
    content: `
      <p>A educação cristã não acontece apenas nos domingos ou durante os momentos de oração. Na verdade, os valores mais profundos são transmitidos através das pequenas ações cotidianas, nas conversas espontâneas e nos exemplos que damos a cada dia.</p>

      <h2>1. Transforme Momentos Simples em Oportunidades de Ensino</h2>
      
      <p>Cada situação do dia oferece uma chance única de ensinar valores cristãos. Quando você está no trânsito e demonstra paciência, quando divide o lanche com um vizinho necessitado, ou quando perdoa um erro - esses são os momentos que realmente educam.</p>

      <div class="highlight-box">
        <h3>💡 Dica Prática</h3>
        <p>Durante as refeições, compartilhe uma gratidão do dia. Isso ensina reconhecimento pelas bênçãos de Deus de forma natural.</p>
      </div>

      <h2>2. Use Histórias e Exemplos Bíblicos</h2>
      
      <p>As crianças aprendem melhor através de histórias. Use narrativas bíblicas para ilustrar situações da vida real. Por exemplo, a história de José pode ensinar sobre perdão quando há conflitos entre irmãos.</p>

      <h3>Histórias Recomendadas por Idade:</h3>
      <ul>
        <li><strong>3-5 anos:</strong> Noé (cuidado com a criação), Davi e Golias (coragem)</li>
        <li><strong>6-9 anos:</strong> José do Egito (perdão), Samuel (obediência)</li>
        <li><strong>10-12 anos:</strong> Daniel (integridade), Ester (coragem para fazer o certo)</li>
      </ul>

      <h2>3. Estabeleça Rotinas de Gratidão</h2>
      
      <p>A gratidão é um dos valores cristãos mais fundamentais. Criar rituais simples de agradecimento desenvolve um coração grato nas crianças.</p>

      <div class="practical-example">
        <h3>🎯 Exemplo Prático: Jarra da Gratidão</h3>
        <p>Coloque uma jarra na mesa de jantar. Cada membro da família escreve uma gratidão do dia em um papel e coloca na jarra. Uma vez por semana, leiam juntos todas as bênçãos.</p>
      </div>

      <h2>4. Demonstre Amor em Ação</h2>
      
      <p>O amor cristão não é apenas um sentimento, mas ações concretas. Envolva as crianças em atos de serviço e compaixão:</p>

      <ul>
        <li>Preparar refeições para vizinhos doentes</li>
        <li>Visitar idosos em asilos</li>
        <li>Arrecadar brinquedos para crianças necessitadas</li>
        <li>Cuidar do meio ambiente como mordomos da criação</li>
      </ul>

      <h2>5. Ensine Através do Próprio Exemplo</h2>
      
      <p>As crianças são observadoras incríveis. Elas aprendem mais com o que veem do que com o que ouvem. Seja o exemplo dos valores que você quer transmitir.</p>

      <div class="reflection-box">
        <h3>🤔 Para Reflexão</h3>
        <p>Que valores cristãos você tem demonstrado naturalmente no seu dia a dia? Como suas ações diárias refletem sua fé?</p>
      </div>

      <h2>Aplicação Prática Semanal</h2>
      
      <p>Para colocar essas ideias em prática, escolha uma estratégia por semana:</p>
      
      <ul>
        <li><strong>Semana 1:</strong> Implemente o momento de gratidão nas refeições</li>
        <li><strong>Semana 2:</strong> Conte uma história bíblica aplicada a uma situação real</li>
        <li><strong>Semana 3:</strong> Realize um ato de serviço em família</li>
        <li><strong>Semana 4:</strong> Reflita sobre os exemplos que você tem dado</li>
      </ul>

      <h2>Conclusão</h2>
      
      <p>Lembre-se: a educação cristã é um processo contínuo que acontece em cada interação. Não precisa ser perfeito - precisa ser autêntico. As crianças precisam ver que a fé é algo vivo e relevante para toda situação da vida.</p>

      <p>Que Deus abençoe sua jornada como educador dos pequenos que Ele confiou aos seus cuidados!</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "A Importância da Oração em Família",
      category: "Vida Espiritual",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Lidando com Perguntas Difíceis das Crianças sobre Fé",
      category: "Orientação aos Pais", 
      readTime: "12 min"
    },
    {
      id: 5,
      title: "Criando Tradições Familiares Significativas",
      category: "Vida Familiar",
      readTime: "7 min"
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Curtida removida" : "Artigo curtido!",
      description: liked ? "Você removeu sua curtida." : "Obrigado pelo seu feedback!",
    });
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Removido dos favoritos" : "Salvo nos favoritos!",
      description: saved ? "Artigo removido da sua lista." : "Você pode encontrar este artigo na sua lista de favoritos.",
    });
  };

  const handleShare = (platform: string) => {
    toast({
      title: "Link copiado!",
      description: `Artigo compartilhado via ${platform}.`,
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Você",
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: 0
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "Comentário publicado!",
        description: "Seu comentário foi adicionado com sucesso.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/pais" className="hover:text-foreground">Área dos Pais</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Header do Artigo */}
            <div className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Link>

              <div className="mb-4">
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Meta informações */}
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.publishedDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{article.views} visualizações</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={liked ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />
                    {article.likes + (liked ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {comments.length}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className={saved ? "text-primary" : ""}
                  >
                    <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Conteúdo do Artigo */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <article 
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{
                    "--prose-body": "hsl(var(--muted-foreground))",
                    "--prose-headings": "hsl(var(--foreground))",
                  } as any}
                />

                {/* Estilização para boxes especiais */}
                <style>{`
                  .highlight-box {
                    background: hsl(var(--primary) / 0.1);
                    border-left: 4px solid hsl(var(--primary));
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 0.5rem;
                  }
                  .highlight-box h3 {
                    color: hsl(var(--primary));
                    margin-bottom: 0.5rem;
                  }
                  .practical-example {
                    background: hsl(var(--accent) / 0.1);
                    border-left: 4px solid hsl(var(--accent));
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 0.5rem;
                  }
                  .practical-example h3 {
                    color: hsl(var(--accent));
                    margin-bottom: 0.5rem;
                  }
                  .reflection-box {
                    background: hsl(var(--secondary) / 0.1);
                    border-left: 4px solid hsl(var(--secondary));
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    border-radius: 0.5rem;
                  }
                  .reflection-box h3 {
                    color: hsl(var(--secondary));
                    margin-bottom: 0.5rem;
                  }
                `}</style>
              </CardContent>
            </Card>

            {/* Tags do Artigo */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags do Artigo
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Autor */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{article.author}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {article.authorBio}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Ver mais artigos
                      </Button>
                      <Button variant="ghost" size="sm">
                        Seguir autor
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compartilhamento */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhe este artigo
                </h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("Facebook")}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("Twitter")}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("Link")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Seção de Comentários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Comentários ({comments.length})
                </CardTitle>
                <CardDescription>
                  Compartilhe sua experiência e tire dúvidas com outros pais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Novo comentário */}
                <div className="space-y-3">
                  <h4 className="font-medium">Deixe seu comentário</h4>
                  <Textarea
                    placeholder="Compartilhe sua experiência, dúvidas ou reflexões sobre este artigo..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleComment} disabled={!newComment.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Publicar Comentário
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Lista de comentários */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {new Date(comment.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {comment.content}
                      </p>
                      {comment.replies > 0 && (
                        <Button variant="ghost" size="sm" className="text-xs">
                          Ver {comment.replies} resposta{comment.replies > 1 ? 's' : ''}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Índice do artigo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Índice
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                    1. Momentos Simples em Oportunidades
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                    2. Histórias e Exemplos Bíblicos
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                    3. Rotinas de Gratidão
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                    4. Amor em Ação
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                    5. Ensino pelo Exemplo
                  </a>
                </CardContent>
              </Card>

              {/* Artigos Relacionados */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Artigos Relacionados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Newsletter
                  </CardTitle>
                  <CardDescription>
                    Receba novos artigos direto no seu email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    className="w-full px-3 py-2 text-sm border rounded-md bg-background"
                  />
                  <Button size="sm" className="w-full">
                    Inscrever-se
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Sem spam. Apenas conteúdo de qualidade para sua família.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;