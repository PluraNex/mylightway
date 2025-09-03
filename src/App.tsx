import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  LazyIndex,
  LazyDashboard,
  LazyLearningPath,
  LazyLessonContent,
  LazyBibleStudy,
  LazyBlog,
  LazyBlogPost,
  LazyAchievements,
  LazyParentsArea,
  LazyNotFound,
  LazyComponents,
} from './pages/lazy';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LazyIndex />} />
                <Route path="/dashboard" element={<LazyDashboard />} />
                <Route path="/trilhas" element={<LearningPathsPage />} />
                <Route path="/trilhas/:pathId" element={<LazyLearningPath />} />
                <Route
                  path="/licao/:lessonId"
                  element={<LazyLessonContent />}
                />
                <Route path="/estudo-biblico" element={<LazyBibleStudy />} />
                <Route path="/blog" element={<LazyBlog />} />
                <Route path="/blog/:postId" element={<LazyBlogPost />} />
                <Route path="/conquistas" element={<LazyAchievements />} />
                <Route path="/pais" element={<LazyParentsArea />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<LazyNotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

// Wrapper component for LearningPaths
const LearningPathsPage = () => (
  <div className="min-h-screen">
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Todas as{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Trilhas
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Escolha uma trilha e comece sua jornada de crescimento espiritual.
            Cada trilha é cuidadosamente desenvolvida para sua idade e nível.
          </p>
        </div>
      </div>
    </div>
    <LazyComponents />
  </div>
);

export default App;
