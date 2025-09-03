import { BookOpen, Heart, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                Crescer na Fé
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Educando crianças nos valores cristãos através de trilhas interativas, 
              versículos e atividades práticas para toda a família.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/trilhas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trilhas Bíblicas
              </Link>
              <Link to="/conquistas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Minhas Conquistas
              </Link>
              <Link to="/pais" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Área dos Pais
              </Link>
              <Link to="/perfil" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Meu Perfil
              </Link>
            </nav>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/ajuda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Central de Ajuda
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Fale Conosco
              </Link>
              <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidade
              </Link>
              <Link to="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
            </nav>
          </div>

          {/* Valores */}
          <div className="space-y-4">
            <h3 className="font-semibold">Nossos Valores</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Amor a Deus</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Segurança Infantil</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Educação Bíblica</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Crescer na Fé. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@crescernafe.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;