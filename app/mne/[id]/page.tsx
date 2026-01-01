"use client"

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, AlertTriangle, FileStack, Search, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCompactNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { mneGroups, filings, auditCases } from '@/data/mock-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MNEDetail({ params }: PageProps) {
  const { id } = use(params);
  const mne = mneGroups.find(m => m.id === id);
  const mneFilings = filings.filter(f => f.mneGroupId === id);
  const mneCases = auditCases.filter(c => c.mneGroupId === id);

  if (!mne) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">MNE Not Found</h2>
          <p className="text-slate-400 mb-4">The MNE you're looking for doesn't exist.</p>
          <Link href="/mne">
            <Button>Back to MNE Registry</Button>
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
          <Link href="/mne">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Building2 className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{mne.name}</h1>
              <StatusBadge status={mne.status} />
            </div>
            <p className="text-slate-400">TIN: {mne.tin}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="outline">Send Correspondence</Button>
        </div>
      </div>

      {/* Profile Summary */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">Risk Score</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={mne.riskScore} />
                <span className="text-2xl font-bold text-white">{mne.riskScoreValue}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400">Compliance Score</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  'text-2xl font-bold',
                  mne.complianceScore >= 80 ? 'text-green-400' :
                  mne.complianceScore >= 60 ? 'text-yellow-400' :
                  'text-red-400'
                )}>
                  {mne.complianceScore}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">
                USD {formatCompactNumber(mne.totalRevenue)}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">Ultimate Parent</p>
              <p className="font-medium text-white">{mne.ultimateParent}</p>
              <p className="text-xs text-slate-400">{mne.ultimateParentJurisdiction}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Sector</p>
              <p className="font-medium text-white">{mne.sector}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Entities in Jurisdiction</p>
              <p className="font-medium text-white">{mne.constituentsInJurisdiction}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Registration Date</p>
              <p className="font-medium text-white">{formatDate(mne.registrationDate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="filings">Filings ({mneFilings.length})</TabsTrigger>
          <TabsTrigger value="audits">Audits ({mneCases.length})</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Key Metrics */}
            <Card className="bg-slate-800/50 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-white">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-slate-400">Total Filings</p>
                    <p className="text-2xl font-bold text-white">{mneFilings.length}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-slate-400">Late Filings</p>
                    <p className="text-2xl font-bold text-white">
                      {mneFilings.filter(f => f.isLate).length}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-slate-400">Total Audits</p>
                    <p className="text-2xl font-bold text-white">{mneCases.length}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-slate-400">Open Audits</p>
                    <p className="text-2xl font-bold text-white">
                      {mneCases.filter(c => c.status !== 'closed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">contact@{mne.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">+971 4 XXX XXXX</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-300">Dubai, United Arab Emirates</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filings">
          <Card className="bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Filing History</CardTitle>
              <Link href="/filings">
                <Button variant="outline" size="sm">View All Filings</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {mneFilings.length > 0 ? (
                <div className="space-y-3">
                  {mneFilings.map((filing) => (
                    <Link
                      key={filing.id}
                      href={`/filings/${filing.id}`}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-white">{filing.id.toUpperCase()}</span>
                          <StatusBadge status={filing.status} />
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          {filing.fiscalYear} · {filing.filingType.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Submitted</p>
                        <p className="text-white">{formatDate(filing.submissionDate)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <FileStack className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No filings found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits">
          <Card className="bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Audit History</CardTitle>
              <Link href="/audit/cases">
                <Button variant="outline" size="sm">View All Cases</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {mneCases.length > 0 ? (
                <div className="space-y-3">
                  {mneCases.map((caseItem) => (
                    <Link
                      key={caseItem.id}
                      href={`/audit/cases/${caseItem.id}`}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{caseItem.caseNumber}</span>
                          <StatusBadge status={caseItem.status} />
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          {caseItem.fiscalYear} · {caseItem.caseType.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Assigned To</p>
                        <p className="text-white">{caseItem.assignedToName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No audit cases found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="font-medium text-white">Low ETR Operations</p>
                      <p className="text-sm text-slate-400">Significant operations in low-tax jurisdictions</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-red-400">Score: 25</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-medium text-white">Complex Structure</p>
                      <p className="text-sm text-slate-400">Multi-jurisdiction holding structure</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-yellow-400">Score: 18</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="font-medium text-white">Previous Adjustment</p>
                      <p className="text-sm text-slate-400">Prior year audit resulted in adjustment</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-red-400">Score: 20</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
