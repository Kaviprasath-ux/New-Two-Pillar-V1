"use client"

import { FileText, AlertTriangle, FileCheck, Bell, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentActivities } from '@/data/mock-data';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const activityIcons: Record<string, { icon: typeof FileText; color: string }> = {
  filing_received: { icon: FileText, color: 'text-blue-400' },
  case_updated: { icon: FileCheck, color: 'text-green-400' },
  assessment_draft: { icon: FileCheck, color: 'text-purple-400' },
  validation_failed: { icon: AlertTriangle, color: 'text-red-400' },
  deadline_alert: { icon: Clock, color: 'text-yellow-400' },
};

export function ActivityFeed() {
  return (
    <Card className="bg-slate-800/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const config = activityIcons[activity.type] || { icon: Bell, color: 'text-slate-400' };
            const Icon = config.icon;

            return (
              <div key={activity.id} className="flex gap-3">
                <div className={cn('mt-0.5', config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
                {activity.priority === 'high' && (
                  <span className="flex h-2 w-2 mt-2 rounded-full bg-red-500" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
