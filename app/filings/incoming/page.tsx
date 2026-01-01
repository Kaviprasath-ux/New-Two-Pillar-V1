"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Inbox, Clock, AlertTriangle, CheckCircle, XCircle, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { filings } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

export default function IncomingFilings() {
  // Filter to show only new/unprocessed filings
  const incomingFilings = filings.filter(
    f => f.status === 'received' || f.status === 'validating'
  );

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Inbox className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Incoming Filings</h1>
            <p className="text-slate-400">New submissions awaiting processing</p>
          </div>
        </div>
        <Badge variant="warning" className="text-lg px-4 py-2">
          {incomingFilings.length} pending
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Inbox className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{incomingFilings.length}</p>
              <p className="text-sm text-slate-400">Total Incoming</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {incomingFilings.filter(f => f.status === 'validating').length}
              </p>
              <p className="text-sm text-slate-400">Validating</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {incomingFilings.filter(f => f.isLate).length}
              </p>
              <p className="text-sm text-slate-400">Late Filings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <UserPlus className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {incomingFilings.filter(f => !f.assignedTo).length}
              </p>
              <p className="text-sm text-slate-400">Unassigned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filing Queue */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Filing Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomingFilings.map((filing) => (
              <div
                key={filing.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-slate-700/50',
                  filing.priority === 'urgent' ? 'border-red-500/50 bg-red-500/5' :
                  filing.priority === 'high' ? 'border-yellow-500/50 bg-yellow-500/5' :
                  'border-slate-700'
                )}
              >
                {/* Priority Indicator */}
                <div className={cn(
                  'w-1 h-16 rounded-full',
                  filing.priority === 'urgent' ? 'bg-red-500' :
                  filing.priority === 'high' ? 'bg-yellow-500' :
                  'bg-slate-600'
                )} />

                {/* Filing Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/filings/${filing.id}`}
                      className="font-medium text-white hover:text-blue-400"
                    >
                      {filing.mneGroupName}
                    </Link>
                    {filing.isLate && (
                      <Badge variant="destructive" className="text-xs">Late</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    <span className="font-mono">{filing.id.toUpperCase()}</span>
                    <span>{filing.fiscalYear}</span>
                    <span>Submitted: {formatDate(filing.submissionDate)}</span>
                  </div>
                </div>

                {/* Validation Status */}
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    {filing.validationStatus === 'passed' && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {filing.validationStatus === 'failed' && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    {filing.validationStatus === 'warnings' && (
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    )}
                    {filing.validationStatus === 'pending' && (
                      <Clock className="h-5 w-5 text-slate-400" />
                    )}
                    <StatusBadge status={filing.validationStatus} />
                  </div>
                  {(filing.validationErrors > 0 || filing.validationWarnings > 0) && (
                    <p className="text-xs text-slate-400 mt-1">
                      {filing.validationErrors > 0 && `${filing.validationErrors} errors`}
                      {filing.validationErrors > 0 && filing.validationWarnings > 0 && ' · '}
                      {filing.validationWarnings > 0 && `${filing.validationWarnings} warnings`}
                    </p>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="text-right">
                  <p className="text-sm text-slate-400">Reported Top-Up Tax</p>
                  <p className="font-mono text-white">{formatCurrency(filing.reportedTopUpTax)}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Assign</Button>
                  <Link href={`/filings/${filing.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              </div>
            ))}

            {incomingFilings.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No incoming filings at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
