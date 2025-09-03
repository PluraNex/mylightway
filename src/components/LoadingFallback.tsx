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
          <Loader2 className="h-4 w-4 animate-spin" />
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-accent">
                  <Heart className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-foreground">MyLightWay</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
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
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <div className="h-4 w-3/4 rounded bg-muted"></div>
          <div className="h-3 w-full rounded bg-muted"></div>
          <div className="h-3 w-5/6 rounded bg-muted"></div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-3 w-1/4 rounded bg-muted"></div>
            <div className="h-8 w-20 rounded bg-muted"></div>
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
        <div className="h-8 w-1/3 rounded bg-muted"></div>
        <div className="h-4 w-1/2 rounded bg-muted"></div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="h-4 w-1/2 rounded bg-muted"></div>
                <div className="h-8 w-3/4 rounded bg-muted"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <LessonCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);
