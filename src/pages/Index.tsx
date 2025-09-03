import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Trophy, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Quick Access Cards */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Comece Agora sua{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Jornada
            </span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer transition-shadow hover:shadow-card">
              <Link to="/dashboard">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white transition-transform group-hover:scale-110">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Meu Progresso</CardTitle>
                  <CardDescription>
                    Veja suas conquistas e continue de onde parou
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Acessar Dashboard
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="group cursor-pointer transition-shadow hover:shadow-card">
              <Link to="/trilhas">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-white transition-transform group-hover:scale-110">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Trilhas Bíblicas</CardTitle>
                  <CardDescription>
                    Explore todas as trilhas disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Ver Trilhas
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="group cursor-pointer transition-shadow hover:shadow-card">
              <Link to="/conquistas">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-success text-white transition-transform group-hover:scale-110">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Minhas Conquistas</CardTitle>
                  <CardDescription>
                    Veja todas as suas badges e níveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Ver Conquistas
                  </Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="group cursor-pointer transition-shadow hover:shadow-card">
              <Link to="/pais">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white transition-transform group-hover:scale-110">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Área dos Pais</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso e receba orientações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Acessar Área
                  </Button>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
};

export default Index;
