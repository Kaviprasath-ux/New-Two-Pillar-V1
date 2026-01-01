"use client"

import Link from 'next/link';
import { AlertCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QueueItem {
  id: string;
  mne: string;
  issue: string;
  priority: 'urgent' | 'high' | 'medium';
  type: string;
}

const queueItems: QueueItem[] = [
  { id: 'fil-005', mne: 'Retail Masters', issue: 'Late Filing - 5 days overdue', priority: 'urgent', type: 'filing' },
  { id: 'fil-001', mne: 'Global Tech', issue: 'Discrepancy in GloBE Income', priority: 'high', type: 'filing' },
  { id: 'fil-003', mne: 'Pharma Solutions', issue: 'Pending Validation Review', priority: 'medium', type: 'filing' },
  { id: 'case-001', mne: 'AutoMotive Global', issue: 'Response pending for 7 days', priority: 'medium', type: 'case' },
];

const priorityConfig = {
  urgent: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', badge: 'destructive' as const },
  high: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', badge: 'warning' as const },
  medium: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', badge: 'secondary' as const },
};

export function PriorityQueue() {
  return (
    <Card className="bg-slate-800/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">Priority Queue</CardTitle>
        <Badge variant="destructive" className="text-xs">
          {queueItems.filter(i => i.priority === 'urgent').length} urgent
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {queueItems.map((item) => {
            const config = priorityConfig[item.priority];
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-700/50',
                  config.bg
                )}
              >
                <Icon className={cn('h-5 w-5', config.color)} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{item.mne}</p>
                  <p className="text-sm text-slate-400 truncate">{item.issue}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                  View
                </Button>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <Link href="/filings" className="text-sm text-blue-400 hover:text-blue-300">
            View all pending items →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
