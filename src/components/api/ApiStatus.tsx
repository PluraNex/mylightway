import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api/client';

interface ApiStatusProps {
  className?: string;
}

export const ApiStatus: React.FC<ApiStatusProps> = ({ className }) => {
  const { data: status, isLoading, error } = useQuery({
    queryKey: ['api-status'],
    queryFn: async () => {
      try {
        await apiClient.get('/health');
        return 'online';
      } catch {
        return 'offline';
      }
    },
    refetchInterval: 30000, // Check every 30 seconds
    retry: 1,
  });

  if (isLoading) {
    return (
      <Badge variant="secondary" className={className}>
        <Clock className="h-3 w-3 mr-1" />
        Verificando...
      </Badge>
    );
  }

  if (error || status === 'offline') {
    return (
      <Badge variant="destructive" className={className}>
        <XCircle className="h-3 w-3 mr-1" />
        API Offline
      </Badge>
    );
  }

  return (
    <Badge variant="default" className={className}>
      <CheckCircle className="h-3 w-3 mr-1" />
      API Online
    </Badge>
  );
};