"use client"

import Link from 'next/link';
import { FileCheck, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { filings } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

export default function VerificationQueue() {
  // Filter filings that need verification (have warnings or errors)
  const verificationQueue = filings.filter(
    f => f.validationStatus === 'warnings' || f.validationStatus === 'failed' || f.status === 'under_review'
  );

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-yellow-500/10">
            <FileCheck className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Verification Queue</h1>
            <p className="text-slate-400">Filings requiring manual verification</p>
          </div>
        </div>
        <Badge variant="warning" className="text-lg px-4 py-2">
          {verificationQueue.length} pending
        </Badge>
      </div>

      {/* Queue Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {verificationQueue.filter(f => f.validationStatus === 'failed').length}
              </p>
              <p className="text-sm text-slate-400">Failed Validation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {verificationQueue.filter(f => f.validationStatus === 'warnings').length}
              </p>
              <p className="text-sm text-slate-400">Has Warnings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <FileCheck className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {verificationQueue.filter(f => f.status === 'under_review').length}
              </p>
              <p className="text-sm text-slate-400">Under Review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Queue */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Queue Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verificationQueue.map((filing) => (
              <div
                key={filing.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-slate-700/50',
                  filing.validationStatus === 'failed' ? 'border-red-500/50 bg-red-500/5' :
                  filing.validationStatus === 'warnings' ? 'border-yellow-500/50 bg-yellow-500/5' :
                  'border-slate-700'
                )}
              >
                {/* Status Icon */}
                <div className={cn(
                  'p-2 rounded-lg',
                  filing.validationStatus === 'failed' ? 'bg-red-500/10' :
                  filing.validationStatus === 'warnings' ? 'bg-yellow-500/10' :
                  'bg-blue-500/10'
                )}>
                  {filing.validationStatus === 'failed' && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  {filing.validationStatus === 'warnings' && (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  )}
                  {filing.validationStatus !== 'failed' && filing.validationStatus !== 'warnings' && (
                    <FileCheck className="h-5 w-5 text-blue-400" />
                  )}
                </div>

                {/* Filing Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/filings/${filing.id}`}
                      className="font-medium text-white hover:text-blue-400"
                    >
                      {filing.mneGroupName}
                    </Link>
                    <StatusBadge status={filing.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    <span className="font-mono">{filing.id.toUpperCase()}</span>
                    <span>{filing.fiscalYear}</span>
                    <span>
                      {filing.validationErrors} errors · {filing.validationWarnings} warnings
                    </span>
                  </div>
                </div>

                {/* Assigned */}
                <div className="text-right">
                  <p className="text-sm text-slate-400">Assigned To</p>
                  <p className="text-white">{filing.assignedTo || 'Unassigned'}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/filings/${filing.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              </div>
            ))}

            {verificationQueue.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <p>No filings require verification</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
