"use client"

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  alert?: {
    text: string;
    variant: 'warning' | 'danger' | 'info';
  };
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, alert }: StatCardProps) {
  return (
    <Card className="bg-slate-800/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            {trend && (
              <p className={cn(
                'mt-1 text-sm',
                trend.positive ? 'text-green-400' : 'text-red-400'
              )}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
            {subtitle && !trend && (
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            )}
            {alert && (
              <p className={cn(
                'mt-2 text-xs',
                alert.variant === 'danger' && 'text-red-400',
                alert.variant === 'warning' && 'text-yellow-400',
                alert.variant === 'info' && 'text-blue-400'
              )}>
                {alert.text}
              </p>
            )}
          </div>
          <div className={cn(
            'rounded-lg p-3',
            alert?.variant === 'danger' ? 'bg-red-500/10' :
            alert?.variant === 'warning' ? 'bg-yellow-500/10' :
            'bg-blue-500/10'
          )}>
            <Icon className={cn(
              'h-6 w-6',
              alert?.variant === 'danger' ? 'text-red-400' :
              alert?.variant === 'warning' ? 'text-yellow-400' :
              'text-blue-400'
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
