import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Quick Access Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comece Agora sua <span className="bg-gradient-primary bg-clip-text text-transparent">Jornada</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-card transition-shadow group cursor-pointer">
              <Link to="/dashboard">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Meu Progresso</CardTitle>
                  <CardDescription>
                    Veja suas conquistas e continue de onde parou
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Acessar Dashboard</Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-card transition-shadow group cursor-pointer">
              <Link to="/trilhas">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Trilhas Bíblicas</CardTitle>
                  <CardDescription>
                    Explore todas as trilhas disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Ver Trilhas</Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-card transition-shadow group cursor-pointer">
              <Link to="/conquistas">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Minhas Conquistas</CardTitle>
                  <CardDescription>
                    Veja todas as suas badges e níveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Ver Conquistas</Button>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-card transition-shadow group cursor-pointer">
              <Link to="/pais">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Área dos Pais</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso e receba orientações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Acessar Área</Button>
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