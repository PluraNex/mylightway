import { BookOpen, Heart, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-lg font-bold text-transparent">
                Crescer na Fé
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Educando crianças nos valores cristãos através de trilhas
              interativas, versículos e atividades práticas para toda a família.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/trilhas"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Trilhas Bíblicas
              </Link>
              <Link
                to="/conquistas"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Minhas Conquistas
              </Link>
              <Link
                to="/pais"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Área dos Pais
              </Link>
              <Link
                to="/perfil"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Meu Perfil
              </Link>
            </nav>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/ajuda"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Central de Ajuda
              </Link>
              <Link
                to="/contato"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Fale Conosco
              </Link>
              <Link
                to="/privacidade"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacidade
              </Link>
              <Link
                to="/termos"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Termos de Uso
              </Link>
            </nav>
          </div>

          {/* Valores */}
          <div className="space-y-4">
            <h3 className="font-semibold">Nossos Valores</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Amor a Deus
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Segurança Infantil
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">
                  Educação Bíblica
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Crescer na Fé. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <p className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
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
