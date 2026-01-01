"use client"

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Flag, Search, FileText, MessageSquare, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { filings, validationResults, mneGroups } from '@/data/mock-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function FilingDetail({ params }: PageProps) {
  const { id } = use(params);
  const filing = filings.find(f => f.id === id);
  const mne = filing ? mneGroups.find(m => m.id === filing.mneGroupId) : null;

  if (!filing) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Filing Not Found</h2>
          <p className="text-slate-400 mb-4">The filing you're looking for doesn't exist.</p>
          <Link href="/filings">
            <Button>Back to Filing Registry</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/filings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Filing: {filing.id.toUpperCase()}</h1>
              <StatusBadge status={filing.status} />
              {filing.isLate && <Badge variant="destructive">Late</Badge>}
            </div>
            <p className="text-slate-400">{filing.mneGroupName} · {filing.fiscalYear}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Request Info
          </Button>
          <Button variant="outline">
            <Flag className="mr-2 h-4 w-4" />
            Flag
          </Button>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Escalate to Audit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filing Information */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Filing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400">MNE Group</p>
                  <p className="font-medium text-white">{filing.mneGroupName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">TIN</p>
                  <p className="font-mono text-white">{mne?.tin || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Fiscal Year</p>
                  <p className="text-white">{filing.fiscalYear}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Filing Type</p>
                  <p className="text-white">{filing.filingType.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Submission Date</p>
                  <p className="text-white">{formatDate(filing.submissionDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Due Date</p>
                  <p className={cn(
                    filing.isLate ? 'text-red-400' : 'text-white'
                  )}>
                    {formatDate(filing.dueDate)}
                    {filing.isLate && ' (Overdue)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Assigned To</p>
                  <p className="text-white">{filing.assignedTo || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Priority</p>
                  <Badge variant={
                    filing.priority === 'urgent' ? 'destructive' :
                    filing.priority === 'high' ? 'warning' :
                    'secondary'
                  }>
                    {filing.priority.charAt(0).toUpperCase() + filing.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reported Figures */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Reported Figures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">GloBE Income</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(filing.globeIncome)}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Covered Taxes</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(filing.coveredTaxes)}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Reported ETR</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    filing.reportedETR < 15 ? 'text-yellow-400' : 'text-white'
                  )}>
                    {formatPercentage(filing.reportedETR)}
                    {filing.reportedETR < 15 && (
                      <AlertTriangle className="inline-block ml-2 h-5 w-5" />
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Reported Top-Up Tax</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(filing.reportedTopUpTax)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          <Card className="bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Validation Results</CardTitle>
              <StatusBadge status={filing.validationStatus} />
            </CardHeader>
            <CardContent>
              {validationResults.length > 0 ? (
                <div className="space-y-3">
                  {validationResults.map((result) => (
                    <div
                      key={result.ruleId}
                      className={cn(
                        'p-4 rounded-lg border',
                        result.severity === 'error' ? 'border-red-500/50 bg-red-500/5' :
                        result.severity === 'warning' ? 'border-yellow-500/50 bg-yellow-500/5' :
                        'border-slate-700'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {result.severity === 'error' && (
                          <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                        )}
                        {result.severity === 'warning' && (
                          <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        )}
                        {result.severity === 'info' && (
                          <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-400">{result.ruleId}</span>
                            <span className="font-medium text-white">{result.ruleName}</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-1">{result.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                            <span>Field: {result.field}</span>
                            <span>Reported: {result.reportedValue}</span>
                            {result.expectedValue && (
                              <span>Expected: {result.expectedValue}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="ghost" size="sm">Accept</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <p>All validation checks passed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Verified
              </Button>
              <Button className="w-full" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Escalate to Audit
              </Button>
              <Button className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Request Information
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Documents
              </Button>
            </CardContent>
          </Card>

          {/* MNE Info */}
          {mne && (
            <Card className="bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">MNE Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Risk Score</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={mne.riskScore} />
                    <span className="text-slate-400">({mne.riskScoreValue})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Compliance Score</p>
                  <p className={cn(
                    'text-lg font-semibold',
                    mne.complianceScore >= 80 ? 'text-green-400' :
                    mne.complianceScore >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  )}>
                    {mne.complianceScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Ultimate Parent</p>
                  <p className="text-white">{mne.ultimateParent}</p>
                  <p className="text-xs text-slate-400">{mne.ultimateParentJurisdiction}</p>
                </div>
                <Separator />
                <Link href={`/mne/${mne.id}`}>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* External References */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">External References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="mr-2 h-4 w-4" />
                SAP TRM Record
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="mr-2 h-4 w-4" />
                CbCR Filing
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="mr-2 h-4 w-4" />
                Company Registry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
