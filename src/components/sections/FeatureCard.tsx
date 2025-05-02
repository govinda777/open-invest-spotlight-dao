
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-dao-purple/10 text-dao-purple mb-4 group-hover:bg-dao-purple/20 transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
