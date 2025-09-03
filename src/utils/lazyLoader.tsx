import React, { Suspense, ComponentType, LazyExoticComponent } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/LoadingFallback';

interface LazyLoadOptions {
  fallback?: React.ComponentType;
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  loadingMessage?: string;
  retryCount?: number;
  delay?: number;
}

/**
 * Enhanced lazy loading wrapper with error boundaries and retry logic
 */
export function createLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): LazyExoticComponent<T> {
  const {
    fallback: CustomFallback,
    errorFallback: CustomErrorFallback,
    loadingMessage = 'Carregando...',
    retryCount = 3,
    delay = 0,
  } = options;

  // Create lazy component with retry logic
  const LazyComponent = React.lazy(async () => {
    let lastError: Error;

    for (let i = 0; i < retryCount; i++) {
      try {
        if (delay > 0 && i > 0) {
          await new Promise(resolve =>
            setTimeout(resolve, delay * Math.pow(2, i))
          );
        }

        const module = await importFn();
        return module;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Lazy load attempt ${i + 1} failed:`, error);

        if (i === retryCount - 1) {
          throw lastError;
        }
      }
    }

    throw lastError!;
  });

  // Return wrapped component
  const WrappedComponent: LazyExoticComponent<T> = React.forwardRef(
    (props, ref) => {
      const FallbackComponent =
        CustomFallback ||
        (() => <LoadingFallback message={loadingMessage} fullScreen />);

      const ErrorFallbackComponent =
        CustomErrorFallback ||
        (({ error, retry }: { error: Error; retry: () => void }) => (
          <div className="flex min-h-screen items-center justify-center">
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-semibold">
                Erro ao carregar componente
              </h2>
              <p className="text-muted-foreground">{error.message}</p>
              <button
                onClick={retry}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ));

      return (
        <ErrorBoundary
          fallback={
            <ErrorFallbackComponent
              error={new Error('Component failed to load')}
              retry={() => window.location.reload()}
            />
          }
        >
          <Suspense fallback={<FallbackComponent />}>
            <LazyComponent {...props} ref={ref} />
          </Suspense>
        </ErrorBoundary>
      );
    }
  ) as LazyExoticComponent<T>;

  WrappedComponent.displayName = `LazyWrapper(${LazyComponent.displayName || 'Component'})`;

  return WrappedComponent;
}

/**
 * Preload a lazy component
 */
export function preloadComponent<T extends ComponentType<unknown>>(
  lazyComponent: LazyExoticComponent<T>
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentImport = (lazyComponent as any)._payload._result;

  if (componentImport) {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (lazyComponent as any)._payload._result || Promise.resolve();
}

/**
 * Hook to preload components on hover or focus
 */
export function usePreloadOnHover<T extends ComponentType<unknown>>(
  lazyComponent: LazyExoticComponent<T>
) {
  const preload = React.useCallback(() => {
    preloadComponent(lazyComponent).catch(console.error);
  }, [lazyComponent]);

  return {
    onMouseEnter: preload,
    onFocus: preload,
  };
}

/**
 * Hook to preload components when they come into viewport
 */
export function usePreloadOnIntersect<T extends ComponentType<unknown>>(
  lazyComponent: LazyExoticComponent<T>,
  options: IntersectionObserverInit = {}
) {
  const [hasPreloaded, setHasPreloaded] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || hasPreloaded) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          preloadComponent(lazyComponent).catch(console.error);
          setHasPreloaded(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [lazyComponent, hasPreloaded, options]);

  return ref;
}

/**
 * Route-based lazy loading with preloading
 */
export interface LazyRouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<unknown>>;
  preload?: string[]; // paths that should trigger preloading
  prefetch?: boolean; // preload immediately
}

/**
 * Create lazy routes configuration - use within a React component to enable hooks
 */
export function useLazyRoutes(configs: LazyRouteConfig[]): LazyRouteConfig[] {
  // Prefetch components marked for immediate loading
  React.useEffect(() => {
    configs.forEach(config => {
      if (config.prefetch) {
        preloadComponent(config.component).catch(console.error);
      }
    });
  }, [configs]);

  // Setup preloading for route transitions
  React.useEffect(() => {
    const handleRouteChange = (_event: PopStateEvent) => {
      const currentPath = window.location.pathname;

      configs.forEach(config => {
        if (config.preload?.includes(currentPath)) {
          preloadComponent(config.component).catch(console.error);
        }
      });
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [configs]);

  return configs;
}

/**
 * Create lazy routes without hooks - for static configuration
 */
export function createLazyRoutes(
  configs: LazyRouteConfig[]
): LazyRouteConfig[] {
  return configs;
}
