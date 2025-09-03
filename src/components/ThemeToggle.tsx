import React from 'react';
import { Sun, Moon, Monitor, Palette, Type, Volume2, VolumeX, Bell, BellOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { usePreferences, useAppStore } from '@/stores/useAppStore';

// Simple theme toggle button
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Escuro';
      case 'system':
        return 'Sistema';
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="gap-2"
      title={`Tema atual: ${getLabel()}`}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  );
};

// Comprehensive theme and preferences panel
export const ThemePreferencesPanel: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize, actualTheme } = useTheme();
  const preferences = usePreferences();
  const { 
    toggleSound, 
    toggleNotifications, 
    setLanguage 
  } = useAppStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Preferências de Aparência
        </CardTitle>
        <CardDescription>
          Personalize a aparência e comportamento do app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Tema</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('light')}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">Claro</span>
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline">Escuro</span>
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('system')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Auto</span>
            </Button>
          </div>
          {theme === 'system' && (
            <p className="text-xs text-muted-foreground">
              Tema atual: {actualTheme === 'dark' ? 'Escuro' : 'Claro'}
            </p>
          )}
        </div>

        <Separator />

        {/* Font Size */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Type className="h-4 w-4" />
            Tamanho da Fonte
          </Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequena</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Ajuste o tamanho da fonte para melhor legibilidade
          </p>
        </div>

        <Separator />

        {/* Sound Settings */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium flex items-center gap-2">
              {preferences.soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              Sons
            </Label>
            <p className="text-xs text-muted-foreground">
              Ativar sons de interação e feedback
            </p>
          </div>
          <Switch
            checked={preferences.soundEnabled}
            onCheckedChange={toggleSound}
          />
        </div>

        <Separator />

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium flex items-center gap-2">
              {preferences.notificationsEnabled ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
              Notificações
            </Label>
            <p className="text-xs text-muted-foreground">
              Receber lembretes e atualizações
            </p>
          </div>
          <Switch
            checked={preferences.notificationsEnabled}
            onCheckedChange={toggleNotifications}
          />
        </div>

        <Separator />

        {/* Language */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Idioma</Label>
          <Select value={preferences.language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick settings dropdown
export const QuickSettings: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const preferences = usePreferences();
  const { toggleSound, toggleNotifications } = useAppStore();

  return (
    <Card className="w-64">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Configurações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm">Tema</Label>
          <div className="flex gap-1">
            <Button
              variant={theme === 'light' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setTheme('light')}
            >
              <Sun className="h-3 w-3" />
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-3 w-3" />
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setTheme('system')}
            >
              <Monitor className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Quick Toggles */}
        <div className="flex items-center justify-between">
          <Label className="text-sm">Sons</Label>
          <Switch
            checked={preferences.soundEnabled}
            onCheckedChange={toggleSound}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Notificações</Label>
          <Switch
            checked={preferences.notificationsEnabled}
            onCheckedChange={toggleNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};