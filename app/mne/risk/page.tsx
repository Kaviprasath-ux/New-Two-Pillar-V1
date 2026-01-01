"use client"

import Link from 'next/link';
import { AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCompactNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { mneGroups } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

export default function RiskProfiles() {
  // Sort MNEs by risk score (highest first)
  const sortedMNEs = [...mneGroups].sort((a, b) => b.riskScoreValue - a.riskScoreValue);
  const highRiskMNEs = sortedMNEs.filter(m => m.riskScore === 'critical' || m.riskScore === 'high');

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-500/10">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Risk Profiles</h1>
            <p className="text-slate-400">MNE groups requiring attention based on risk assessment</p>
          </div>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-300">Critical</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {mneGroups.filter(m => m.riskScore === 'critical').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-slate-300">High</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {mneGroups.filter(m => m.riskScore === 'high').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-slate-300">Medium</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {mneGroups.filter(m => m.riskScore === 'medium').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-300">Low</span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {mneGroups.filter(m => m.riskScore === 'low').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* High Risk MNEs */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            High Risk MNE Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highRiskMNEs.map((mne) => (
              <div
                key={mne.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border',
                  mne.riskScore === 'critical' ? 'border-red-500/50 bg-red-500/5' :
                  'border-orange-500/50 bg-orange-500/5'
                )}
              >
                {/* Risk Indicator */}
                <div className={cn(
                  'flex items-center justify-center w-16 h-16 rounded-lg',
                  mne.riskScore === 'critical' ? 'bg-red-500/20' : 'bg-orange-500/20'
                )}>
                  <span className={cn(
                    'text-2xl font-bold',
                    mne.riskScore === 'critical' ? 'text-red-400' : 'text-orange-400'
                  )}>
                    {mne.riskScoreValue}
                  </span>
                </div>

                {/* MNE Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/mne/${mne.id}`}
                      className="font-medium text-white hover:text-blue-400"
                    >
                      {mne.name}
                    </Link>
                    <StatusBadge status={mne.riskScore} />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {mne.sector} · Revenue: USD {formatCompactNumber(mne.totalRevenue)}
                  </p>
                </div>

                {/* Compliance Score */}
                <div className="text-right">
                  <p className="text-sm text-slate-400">Compliance</p>
                  <p className={cn(
                    'text-lg font-semibold',
                    mne.complianceScore >= 80 ? 'text-green-400' :
                    mne.complianceScore >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  )}>
                    {mne.complianceScore}%
                  </p>
                </div>

                {/* Actions */}
                <Link href={`/mne/${mne.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All MNEs by Risk Score */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            All MNEs by Risk Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedMNEs.map((mne) => (
              <Link
                key={mne.id}
                href={`/mne/${mne.id}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className={cn(
                  'w-2 h-8 rounded-full',
                  mne.riskScore === 'critical' ? 'bg-red-500' :
                  mne.riskScore === 'high' ? 'bg-orange-500' :
                  mne.riskScore === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                )} />
                <div className="flex-1">
                  <p className="font-medium text-white">{mne.name}</p>
                  <p className="text-xs text-slate-400">{mne.sector}</p>
                </div>
                <div className="w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Risk</span>
                    <span className="text-xs font-medium text-white">{mne.riskScoreValue}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        mne.riskScore === 'critical' ? 'bg-red-500' :
                        mne.riskScore === 'high' ? 'bg-orange-500' :
                        mne.riskScore === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      )}
                      style={{ width: `${mne.riskScoreValue}%` }}
                    />
                  </div>
                </div>
                <StatusBadge status={mne.riskScore} />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
