import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  text,
}) => {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeMap[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

interface LoadingStateProps {
  isLoading?: boolean;
  error?: Error | null;
  children: React.ReactNode;
  loadingText?: string;
  errorText?: string;
  className?: string;
  minHeight?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  children,
  loadingText = 'Carregando...',
  errorText = 'Erro ao carregar dados',
  className,
  minHeight = 'min-h-[200px]',
}) => {
  if (error) {
    return (
      <div
        className={cn('flex items-center justify-center', minHeight, className)}
      >
        <div className="text-center">
          <div className="mb-2 text-sm text-destructive">{errorText}</div>
          <div className="text-xs text-muted-foreground">{error.message}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn('flex items-center justify-center', minHeight, className)}
      >
        <LoadingSpinner text={loadingText} />
      </div>
    );
  }

  return <>{children}</>;
};
