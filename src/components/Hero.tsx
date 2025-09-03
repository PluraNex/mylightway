import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroFamily from "@/assets/hero-family.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-secondary animate-pulse delay-700"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-medium">Educação Cristã Divertida</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Cresça na{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Palavra
                </span>{" "}
                junto com seus{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  filhos
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                Trilhas de aprendizado bíblico interativas que transformam a educação cristã 
                em uma aventura emocionante para toda a família.
              </p>
            </div>

              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-card" asChild>
                <Link to="/dashboard">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Começar Jornada
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5" asChild>
                <Link to="/pais">
                  <Heart className="w-5 h-5 mr-2" />
                  Para Pais
                </Link>
              </Button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Trilhas Bíblicas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Versículos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">∞</div>
                <div className="text-sm text-muted-foreground">Aprendizado</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src={heroFamily}
                alt="Família cristã lendo a Bíblia junta"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gradient-accent rounded-full p-4 shadow-badge animate-bounce">
              <Star className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-success rounded-full p-4 shadow-badge animate-bounce delay-500">
              <Heart className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;