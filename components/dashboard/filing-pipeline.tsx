"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

const stages: PipelineStage[] = [
  { name: 'Received', count: 23, color: 'bg-blue-500' },
  { name: 'Validating', count: 8, color: 'bg-yellow-500' },
  { name: 'Under Review', count: 15, color: 'bg-orange-500' },
  { name: 'Verified', count: 801, color: 'bg-green-500' },
];

export function FilingPipeline() {
  const total = stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className="bg-slate-800/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Filing Status Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Pipeline visualization */}
        <div className="flex items-center justify-between mb-6">
          {stages.map((stage, index) => (
            <div key={stage.name} className="flex items-center">
              <div className="text-center">
                <div className={cn(
                  'mx-auto flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white',
                  stage.color
                )}>
                  {stage.count}
                </div>
                <p className="mt-2 text-xs text-slate-400">{stage.name}</p>
              </div>
              {index < stages.length - 1 && (
                <div className="mx-2 h-0.5 w-8 bg-slate-600" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex h-4 overflow-hidden rounded-full bg-slate-700">
            {stages.map((stage) => (
              <div
                key={stage.name}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / total) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Total: {total} filings</span>
            <span>{((stages[3].count / total) * 100).toFixed(1)}% complete</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
