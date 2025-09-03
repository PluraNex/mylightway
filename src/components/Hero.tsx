import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroFamily from '@/assets/hero-family.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-primary"></div>
        <div className="absolute right-20 top-40 h-24 w-24 animate-pulse rounded-full bg-accent delay-300"></div>
        <div className="absolute bottom-20 left-1/4 h-40 w-40 animate-pulse rounded-full bg-secondary delay-700"></div>
      </div>

      <div className="container relative mx-auto px-4 py-12 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 shadow-soft backdrop-blur-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-sm font-medium">
                  Educação Cristã Divertida
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
                Cresça na{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Palavra
                </span>{' '}
                junto com seus{' '}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  filhos
                </span>
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground lg:text-xl">
                Trilhas de aprendizado bíblico interativas que transformam a
                educação cristã em uma aventura emocionante para toda a família.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-primary shadow-card hover:opacity-90"
              asChild
            >
              <Link to="/dashboard">
                <BookOpen className="mr-2 h-5 w-5" />
                Começar Jornada
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link to="/pais">
                <Heart className="mr-2 h-5 w-5" />
                Para Pais
              </Link>
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary lg:text-3xl">
                  10+
                </div>
                <div className="text-sm text-muted-foreground">
                  Trilhas Bíblicas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary lg:text-3xl">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Versículos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent lg:text-3xl">
                  ∞
                </div>
                <div className="text-sm text-muted-foreground">Aprendizado</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card">
              <img
                src={heroFamily}
                alt="Família cristã lendo a Bíblia junta"
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>

            {/* Floating badges */}
            <div className="absolute -right-4 -top-4 animate-bounce rounded-full bg-gradient-accent p-4 shadow-badge">
              <Star className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bounce rounded-full bg-gradient-success p-4 shadow-badge delay-500">
              <Heart className="h-6 w-6 text-success-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
