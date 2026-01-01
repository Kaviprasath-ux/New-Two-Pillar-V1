"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monthlyRevenueData } from '@/data/mock-data';
import { formatCompactNumber } from '@/lib/utils';

export function RevenueChart() {
  const maxValue = Math.max(...monthlyRevenueData.map(d => Math.max(d.collected, d.target)));

  return (
    <Card className="bg-slate-800/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Monthly DMTT Collections</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simple bar chart */}
        <div className="flex items-end justify-between gap-2 h-48">
          {monthlyRevenueData.map((data) => {
            const collectedHeight = (data.collected / maxValue) * 100;
            const targetHeight = (data.target / maxValue) * 100;

            return (
              <div key={data.month} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full h-40 flex flex-col justify-end">
                  {/* Target indicator */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-slate-500"
                    style={{ bottom: `${targetHeight}%` }}
                  />
                  {/* Collected bar */}
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all group-hover:bg-blue-400"
                    style={{ height: `${collectedHeight}%` }}
                  >
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-700 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      {formatCompactNumber(data.collected)}
                    </div>
                  </div>
                </div>
                <span className="mt-2 text-xs text-slate-400">{data.month}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-blue-500" />
            <span className="text-xs text-slate-400">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-slate-500" />
            <span className="text-xs text-slate-400">Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
