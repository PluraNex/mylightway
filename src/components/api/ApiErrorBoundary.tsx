import React from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ApiError } from '@/lib/api/client';

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: ApiError, resetError: () => void) => React.ReactNode;
}

interface ApiErrorFallbackProps {
  error: ApiError;
  resetError: () => void;
}

const DefaultApiErrorFallback: React.FC<ApiErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  const getErrorMessage = (error: ApiError) => {
    if (error.status === 401) {
      return 'Você precisa fazer login para acessar este conteúdo.';
    }
    if (error.status === 403) {
      return 'Você não tem permissão para acessar este conteúdo.';
    }
    if (error.status === 404) {
      return 'O conteúdo solicitado não foi encontrado.';
    }
    if (error.status === 500) {
      return 'Erro interno do servidor. Tente novamente em alguns minutos.';
    }
    if (error.code === 'NETWORK_ERROR') {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    return error.message || 'Ocorreu um erro inesperado. Tente novamente.';
  };

  const getErrorTitle = (error: ApiError) => {
    if (error.status === 401) return 'Login Necessário';
    if (error.status === 403) return 'Acesso Negado';
    if (error.status === 404) return 'Não Encontrado';
    if (error.status >= 500) return 'Erro do Servidor';
    if (error.code === 'NETWORK_ERROR') return 'Erro de Conexão';
    return 'Erro';
  };

  return (
    <div className="flex min-h-[200px] items-center justify-center p-4">
      <Alert className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{getErrorTitle(error)}</AlertTitle>
        <AlertDescription className="mt-2">
          {getErrorMessage(error)}
        </AlertDescription>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={resetError}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({
  children,
  fallback = DefaultApiErrorFallback,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => {
            const apiError = error as ApiError;
            return fallback(apiError, resetErrorBoundary);
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    onReset?: () => void;
    fallbackRender: ({
      error,
      resetErrorBoundary,
    }: {
      error: any;
      resetErrorBoundary: () => void;
    }) => React.ReactNode;
  },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('API Error Boundary caught an error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallbackRender({
        error: this.state.error,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }

    return this.props.children;
  }
}
