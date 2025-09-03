import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  colorClass: string;
}

const StatsCard = ({
  icon: Icon,
  value,
  label,
  colorClass,
}: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Icon className={`mx-auto mb-3 h-8 w-8 ${colorClass}`} />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
