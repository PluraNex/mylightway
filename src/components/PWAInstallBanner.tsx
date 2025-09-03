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
      <Card className="shadow-lg border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">
                Instalar MyLightWay
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adicione à tela inicial para acesso rápido e experiência nativa!
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="flex-1 h-8 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Instalar
                </Button>
                <Button
                  onClick={dismissBanner}
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                >
                  <X className="w-3 h-3" />
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
  const { showBanner, dismissBanner, install, isInstallable } = useInstallBanner();

  if (!showBanner || !isInstallable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-2">
                Instalar MyLightWay
              </h2>
              <p className="text-muted-foreground text-sm">
                Transforme sua experiência! Instale nosso app para:
              </p>
            </div>

            <ul className="text-sm space-y-2 text-left">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Acesso mais rápido
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Funciona offline
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Notificações personalizadas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Experiência nativa
              </li>
            </ul>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={install}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Instalar Agora
              </Button>
              <Button
                onClick={dismissBanner}
                variant="outline"
              >
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
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="shadow-lg border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">
                Atualização Disponível
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Uma nova versão está disponível com melhorias e correções.
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={update}
                  size="sm"
                  className="flex-1 h-8 text-xs"
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