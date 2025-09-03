import React from 'react';
import { X, Download, Smartphone, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useInstallBanner } from '@/hooks/usePWA';
import { usePreferences } from '@/stores/useAppStore';

export const PWAInstallBanner: React.FC = () => {
  const { showBanner, dismissBanner, install } = useInstallBanner();
  const preferences = usePreferences();

  if (!showBanner) return null;

  const handleInstall = async () => {
    const success = await install();
    if (!success) {
      // Fallback: show manual install instructions
      // You could show a modal with platform-specific instructions
      console.log('Install prompt failed, showing manual instructions');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-sm font-semibold">
                Instalar MyLightWay
              </h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Adicione à tela inicial para acesso rápido e experiência nativa!
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="h-8 flex-1 text-xs"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Instalar
                </Button>
                <Button
                  onClick={dismissBanner}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PWAInstallPrompt: React.FC = () => {
  const { showBanner, dismissBanner, install, isInstallable } =
    useInstallBanner();

  if (!showBanner || !isInstallable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
              <Monitor className="h-8 w-8 text-white" />
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">Instalar MyLightWay</h2>
              <p className="text-sm text-muted-foreground">
                Transforme sua experiência! Instale nosso app para:
              </p>
            </div>

            <ul className="space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Acesso mais rápido
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Funciona offline
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Notificações personalizadas
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Experiência nativa
              </li>
            </ul>

            <div className="flex gap-2 pt-4">
              <Button onClick={install} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Instalar Agora
              </Button>
              <Button onClick={dismissBanner} variant="outline">
                Mais Tarde
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PWAUpdatePrompt: React.FC = () => {
  const { showUpdatePrompt, update, dismiss } = useAppUpdate();

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed left-4 right-4 top-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-success">
                <Download className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="mb-1 text-sm font-semibold">
                Atualização Disponível
              </h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Uma nova versão está disponível com melhorias e correções.
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={update}
                  size="sm"
                  className="h-8 flex-1 text-xs"
                >
                  Atualizar
                </Button>
                <Button
                  onClick={dismiss}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  Depois
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add to App.tsx
import { useAppUpdate } from '@/hooks/usePWA';
