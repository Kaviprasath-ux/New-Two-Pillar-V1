"use client"

import Link from 'next/link';
import { FileText, Plus, Clock, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { assessments } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

export default function Assessments() {
  const statusCounts = {
    draft: assessments.filter(a => a.status === 'draft').length,
    pending_approval: assessments.filter(a => a.status === 'pending_approval').length,
    issued: assessments.filter(a => a.status === 'issued').length,
  };

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Assessments</h1>
            <p className="text-slate-400">DMTT assessment notices</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-slate-600/50">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.draft}</p>
              <p className="text-sm text-slate-400">Drafts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.pending_approval}</p>
              <p className="text-sm text-slate-400">Pending Approval</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Send className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.issued}</p>
              <p className="text-sm text-slate-400">Issued</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Assessment List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <Link
                key={assessment.id}
                href={`/audit/assessments/${assessment.id}`}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{assessment.assessmentNumber}</span>
                    <StatusBadge status={assessment.status} />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {assessment.mneGroupName} · {assessment.fiscalYear}
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Additional Tax</p>
                    <p className="font-mono text-white">{formatCurrency(assessment.additionalTax)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Total Assessed</p>
                    <p className="font-mono text-green-400 font-semibold">
                      {formatCurrency(assessment.totalAssessed)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Prepared By</p>
                    <p className="text-white">{assessment.preparedBy}</p>
                  </div>
                </div>
              </Link>
            ))}

            {assessments.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No assessments yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
