import { useState, useEffect, useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  needRefresh: boolean;
  updateAvailable: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    needRefresh: false,
    updateAvailable: false,
  });

  // Service Worker registration
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
    onNeedRefresh() {
      setPwaState(prev => ({ ...prev, needRefresh: true, updateAvailable: true }));
    },
    onOfflineReady() {
      console.log('App ready to work offline');
    },
  });

  // Install prompt handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setPwaState(prev => ({ ...prev, isInstallable: true }));
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setPwaState(prev => ({ 
        ...prev, 
        isInstalled: true, 
        isInstallable: false 
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setPwaState(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setPwaState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check if already installed
  useEffect(() => {
    const checkInstallation = () => {
      // Check if running in standalone mode (installed PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check if running as PWA on iOS
      const isIOSPWA = (window.navigator as any).standalone === true;
      
      if (isStandalone || isIOSPWA) {
        setPwaState(prev => ({ ...prev, isInstalled: true }));
      }
    };

    checkInstallation();
  }, []);

  // Install PWA
  const installApp = useCallback(async () => {
    if (!installPrompt) return false;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallPrompt(null);
        setPwaState(prev => ({ 
          ...prev, 
          isInstallable: false,
          isInstalled: true 
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to install PWA:', error);
      return false;
    }
  }, [installPrompt]);

  // Update app
  const updateApp = useCallback(async () => {
    try {
      await updateServiceWorker(true);
      setPwaState(prev => ({ 
        ...prev, 
        needRefresh: false, 
        updateAvailable: false 
      }));
      return true;
    } catch (error) {
      console.error('Failed to update app:', error);
      return false;
    }
  }, [updateServiceWorker]);

  // Dismiss update
  const dismissUpdate = useCallback(() => {
    setPwaState(prev => ({ 
      ...prev, 
      needRefresh: false, 
      updateAvailable: false 
    }));
  }, []);

  return {
    ...pwaState,
    installApp,
    updateApp,
    dismissUpdate,
  };
};

// Hook for PWA install banner
export const useInstallBanner = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    setBannerDismissed(dismissed === 'true');
  }, []);

  useEffect(() => {
    if (isInstallable && !isInstalled && !bannerDismissed) {
      // Show banner after a delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, bannerDismissed]);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
    setBannerDismissed(true);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  }, []);

  const install = useCallback(async () => {
    const success = await installApp();
    if (success) {
      setShowBanner(false);
    }
    return success;
  }, [installApp]);

  return {
    showBanner,
    dismissBanner,
    install,
    isInstallable,
    isInstalled,
  };
};

// Hook for app update notifications
export const useAppUpdate = () => {
  const { updateAvailable, updateApp, dismissUpdate } = usePWA();
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  const update = useCallback(async () => {
    const success = await updateApp();
    setShowUpdatePrompt(false);
    return success;
  }, [updateApp]);

  const dismiss = useCallback(() => {
    dismissUpdate();
    setShowUpdatePrompt(false);
  }, [dismissUpdate]);

  return {
    showUpdatePrompt,
    update,
    dismiss,
  };
};