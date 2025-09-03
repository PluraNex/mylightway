import React from 'react';
import { Loader2, BookOpen, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'minimal' | 'branded';
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Carregando...',
  fullScreen = false,
  variant = 'default',
}) => {
  const containerClass = fullScreen
    ? 'min-h-screen flex items-center justify-center bg-background'
    : 'flex items-center justify-center p-8';

  if (variant === 'minimal') {
    return (
      <div className={containerClass}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">{message}</span>
        </div>
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className={containerClass}>
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">MyLightWay</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">{message}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default variant
  return (
    <div className={containerClass}>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">{message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Skeleton loading components for different content types
export const LessonCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-3 bg-muted rounded w-1/4"></div>
            <div className="h-8 bg-muted rounded w-20"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 p-6">
    <div className="animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Content Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <LessonCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);