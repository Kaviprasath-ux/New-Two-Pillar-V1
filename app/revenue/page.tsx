"use client"

import { DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { globalStats, assessments } from '@/data/mock-data';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';

export default function Revenue() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-green-500/10">
          <DollarSign className="h-6 w-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue & Collections</h1>
          <p className="text-slate-400">DMTT revenue tracking and collection management</p>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-sm text-slate-400">Total Collected</span>
            </div>
            <p className="text-2xl font-bold text-white">
              AED {formatCompactNumber(globalStats.totalDMTTCollected)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-sm text-slate-400">Pending Collection</span>
            </div>
            <p className="text-2xl font-bold text-white">
              AED {formatCompactNumber(globalStats.pendingCollection)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-slate-400">Assessments Issued</span>
            </div>
            <p className="text-2xl font-bold text-white">
              AED {formatCompactNumber(globalStats.assessmentsIssued)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-sm text-slate-400">Overdue</span>
            </div>
            <p className="text-2xl font-bold text-white">AED 12.5M</p>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Assessments */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Outstanding Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.filter(a => a.outstandingAmount > 0).map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50"
              >
                <div>
                  <p className="font-medium text-white">{assessment.mneGroupName}</p>
                  <p className="text-sm text-slate-400">
                    {assessment.assessmentNumber} · {assessment.fiscalYear}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Outstanding</p>
                  <p className="font-mono text-lg font-semibold text-yellow-400">
                    {formatCurrency(assessment.outstandingAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
