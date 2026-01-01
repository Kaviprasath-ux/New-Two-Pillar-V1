"use client"

import { TrendingUp, DollarSign, Percent, Clock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { globalStats, monthlyRevenueData, filingStatusDistribution, sectorBreakdown, riskDistribution } from '@/data/mock-data';
import { formatCompactNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/10">
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400">FY2024 Performance Metrics</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-sm text-slate-400">Total DMTT Collected</span>
            </div>
            <p className="text-2xl font-bold text-white">
              AED {formatCompactNumber(globalStats.totalDMTTCollected)}
            </p>
            <p className="text-sm text-green-400 mt-1">↑ 34% YoY</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Percent className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-slate-400">Compliance Rate</span>
            </div>
            <p className="text-2xl font-bold text-white">{globalStats.complianceRate}%</p>
            <p className="text-sm text-green-400 mt-1">↑ 2.1%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-400">Audit Yield Rate</span>
            </div>
            <p className="text-2xl font-bold text-white">{globalStats.auditYieldRate}%</p>
            <p className="text-sm text-green-400 mt-1">↑ 1.8%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-sm text-slate-400">Avg Processing Time</span>
            </div>
            <p className="text-2xl font-bold text-white">18 days</p>
            <p className="text-sm text-green-400 mt-1">↓ 22% faster</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Collections */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Monthly DMTT Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {monthlyRevenueData.map((data) => {
                const maxValue = Math.max(...monthlyRevenueData.map(d => d.collected));
                const height = (data.collected / maxValue) * 100;

                return (
                  <div key={data.month} className="flex flex-col items-center flex-1 group">
                    <div className="relative w-full h-40 flex flex-col justify-end">
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all group-hover:bg-blue-400"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="mt-2 text-xs text-slate-400">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filing Status Distribution */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Filing Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filingStatusDistribution.map((status) => (
                <div key={status.name} className="flex items-center gap-4">
                  <span className="text-slate-300 w-28">{status.name}</span>
                  <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${status.value}%`,
                        backgroundColor: status.color
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-12 text-right">{status.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top-Up Tax by Sector */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Top-Up Tax by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorBreakdown.map((sector) => (
                <div key={sector.name} className="flex items-center gap-4">
                  <span className="text-slate-300 w-24">{sector.name}</span>
                  <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${sector.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-16 text-right">{sector.value}%</span>
                </div>
              ))}
              <p className="text-sm text-slate-500 mt-4">
                Total: AED {formatCompactNumber(globalStats.totalDMTTCollected)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audit Outcomes */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Audit Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-slate-300 w-40">Additional Assessment</span>
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-green-500" style={{ width: '62%' }} />
                </div>
                <span className="text-sm text-slate-400 w-12 text-right">62%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-300 w-40">No Change</span>
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-slate-500" style={{ width: '28%' }} />
                </div>
                <span className="text-sm text-slate-400 w-12 text-right">28%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-300 w-40">Reduced Assessment</span>
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: '10%' }} />
                </div>
                <span className="text-sm text-slate-400 w-12 text-right">10%</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Avg Adjustment</p>
                  <p className="text-white font-semibold">AED 2.34M</p>
                </div>
                <div>
                  <p className="text-slate-400">Avg Case Duration</p>
                  <p className="text-white font-semibold">45 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Heat Map */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Risk Distribution by MNE Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {riskDistribution.map((risk) => (
              <Card
                key={risk.name}
                className={cn(
                  'bg-slate-700/50 border',
                  risk.name === 'Critical' ? 'border-red-500/50' :
                  risk.name === 'High' ? 'border-orange-500/50' :
                  risk.name === 'Medium' ? 'border-yellow-500/50' :
                  'border-green-500/50'
                )}
              >
                <CardContent className="p-4 text-center">
                  <div className={cn(
                    'w-4 h-4 rounded-full mx-auto mb-2',
                    risk.name === 'Critical' ? 'bg-red-500' :
                    risk.name === 'High' ? 'bg-orange-500' :
                    risk.name === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  )} />
                  <p className="font-medium text-white">{risk.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{risk.count}</p>
                  <p className="text-sm text-slate-400">{risk.percentage}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
