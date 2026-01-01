"use client"

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, MessageSquare, Clock, CheckCircle, AlertTriangle, Search, User, Calendar, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { auditCases, filings, mneGroups } from '@/data/mock-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CaseDetail({ params }: PageProps) {
  const { id } = use(params);
  const caseItem = auditCases.find(c => c.id === id);
  const mne = caseItem ? mneGroups.find(m => m.id === caseItem.mneGroupId) : null;
  const relatedFilings = filings.filter(f => f.mneGroupId === caseItem?.mneGroupId);

  if (!caseItem) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Case Not Found</h2>
          <p className="text-slate-400 mb-4">The case you're looking for doesn't exist.</p>
          <Link href="/audit/cases">
            <Button>Back to Case Management</Button>
          </Link>
        </div>
      </div>
    );
  }

  const priorityConfig = {
    low: { color: 'text-slate-400', label: 'Low' },
    medium: { color: 'text-yellow-400', label: 'Medium' },
    high: { color: 'text-orange-400', label: 'High' },
    critical: { color: 'text-red-400', label: 'Critical' },
  };

  const priority = priorityConfig[caseItem.priority];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/audit/cases">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{caseItem.caseNumber}</h1>
              <StatusBadge status={caseItem.status} />
              <Badge variant="outline" className={priority.color}>
                {priority.label} Priority
              </Badge>
            </div>
            <p className="text-slate-400">{caseItem.mneGroupName} · {caseItem.fiscalYear}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/audit/workbench">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Open Workbench
            </Button>
          </Link>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Assessment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Summary */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Case Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400">Case Type</p>
                  <p className="font-medium text-white capitalize">
                    {caseItem.caseType.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Assigned To</p>
                  <p className="font-medium text-white">{caseItem.assignedToName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Opened Date</p>
                  <p className="font-medium text-white">{formatDate(caseItem.openedDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Due Date</p>
                  <p className="font-medium text-white">{formatDate(caseItem.dueDate)}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Original Top-Up Tax</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(caseItem.originalTopUpTax)}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Adjusted Top-Up Tax</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(caseItem.adjustedTopUpTax)}</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-sm text-slate-400">Proposed Adjustment</p>
                  <p className="text-xl font-bold text-green-400">
                    {caseItem.proposedAdjustment > 0
                      ? `+${formatCurrency(caseItem.proposedAdjustment)}`
                      : '—'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="timeline" className="space-y-6">
            <TabsList className="bg-slate-800">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents ({caseItem.documentsCount})</TabsTrigger>
              <TabsTrigger value="correspondence">Correspondence</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <Card className="bg-slate-800/50">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Timeline items */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="p-2 rounded-full bg-blue-500/20">
                          <Briefcase className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="w-0.5 flex-1 bg-slate-700 mt-2" />
                      </div>
                      <div className="pb-6">
                        <p className="font-medium text-white">Case Opened</p>
                        <p className="text-sm text-slate-400 mt-1">
                          Case created from filing review. Initial risk assessment completed.
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {formatDate(caseItem.openedDate)} · {caseItem.assignedToName}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="p-2 rounded-full bg-yellow-500/20">
                          <MessageSquare className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div className="w-0.5 flex-1 bg-slate-700 mt-2" />
                      </div>
                      <div className="pb-6">
                        <p className="font-medium text-white">Information Request Sent</p>
                        <p className="text-sm text-slate-400 mt-1">
                          Requested supporting documentation for excluded dividend claim.
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Oct 1, 2024 · {caseItem.assignedToName}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="p-2 rounded-full bg-green-500/20">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-white">MNE Response Received</p>
                        <p className="text-sm text-slate-400 mt-1">
                          Documentation provided. Share purchase agreement shows 11-month holding period.
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Oct 15, 2024 · System
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="bg-slate-800/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {['Share Purchase Agreement.pdf', 'CbCR Extract FY2024.xlsx', 'Tax Provision Schedule.pdf', 'Dividend Payment Confirmations.pdf'].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="text-white">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="correspondence">
              <Card className="bg-slate-800/50">
                <CardContent className="p-6 text-center text-slate-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No correspondence yet</p>
                  <Button variant="outline" className="mt-4">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send New Message
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/audit/workbench" className="block">
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Open Audit Workbench
                </Button>
              </Link>
              <Button className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Request Documents
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Add Finding
              </Button>
            </CardContent>
          </Card>

          {/* Next Action */}
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Next Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white">{caseItem.nextAction}</p>
              <p className="text-sm text-slate-400 mt-2">
                Last activity: {formatDate(caseItem.lastActivity)}
              </p>
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
                <Separator />
                <Link href={`/mne/${mne.id}`}>
                  <Button variant="outline" className="w-full">
                    View Full Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
