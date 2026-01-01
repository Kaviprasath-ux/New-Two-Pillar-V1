"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Plus, Filter, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { auditCases, demoUsers } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

const priorityConfig = {
  low: { color: 'text-slate-400', bg: 'bg-slate-500' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500' },
  critical: { color: 'text-red-400', bg: 'bg-red-500' },
};

export default function CaseManagement() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'my'>('all');

  const filteredCases = auditCases.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  const casesByStatus = {
    open: auditCases.filter(c => c.status === 'open'),
    in_progress: auditCases.filter(c => c.status === 'in_progress'),
    pending_response: auditCases.filter(c => c.status === 'pending_response'),
    closed: auditCases.filter(c => c.status === 'closed'),
  };

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-500/10">
            <Briefcase className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Case Management</h1>
            <p className="text-slate-400">Manage DMTT audit cases</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Case
        </Button>
      </div>

      {/* Pipeline View */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Case Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {(['open', 'in_progress', 'pending_response', 'closed'] as const).map((status) => (
              <div key={status} className="text-center">
                <div className={cn(
                  'mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white mb-2',
                  status === 'open' ? 'bg-blue-500' :
                  status === 'in_progress' ? 'bg-yellow-500' :
                  status === 'pending_response' ? 'bg-orange-500' :
                  'bg-green-500'
                )}>
                  {casesByStatus[status].length}
                </div>
                <p className="text-sm text-slate-400 capitalize">{status.replace('_', ' ')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('all')}
          >
            All Cases
          </Button>
          <Button
            variant={viewMode === 'my' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('my')}
          >
            My Cases
          </Button>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-slate-800 border-slate-600">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="pending_response">Pending Response</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {filteredCases.map((caseItem) => {
              const priority = priorityConfig[caseItem.priority];
              const dueDate = new Date(caseItem.dueDate);
              const today = new Date();
              const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

              return (
                <Link
                  key={caseItem.id}
                  href={`/audit/cases/${caseItem.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-slate-700/50 transition-colors"
                >
                  {/* Priority Indicator */}
                  <div className={cn('w-1 h-16 rounded-full', priority.bg)} />

                  {/* Case Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn('font-medium', priority.color)}>
                        {caseItem.caseNumber}
                      </span>
                      <StatusBadge status={caseItem.status} />
                      <Badge variant="outline" className="text-xs">
                        {caseItem.caseType.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-white mt-1">{caseItem.mneGroupName}</p>
                    <p className="text-sm text-slate-400">{caseItem.fiscalYear}</p>
                  </div>

                  {/* Assigned To */}
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Assigned To</p>
                    <p className="text-white">{caseItem.assignedToName}</p>
                  </div>

                  {/* Due Date */}
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Due Date</p>
                    <p className={cn(
                      daysUntilDue < 14 ? 'text-yellow-400' :
                      daysUntilDue < 7 ? 'text-red-400' :
                      'text-white'
                    )}>
                      {formatDate(caseItem.dueDate)}
                    </p>
                  </div>

                  {/* Proposed Adjustment */}
                  <div className="text-right min-w-32">
                    <p className="text-sm text-slate-400">Proposed Adj.</p>
                    <p className={cn(
                      'font-mono',
                      caseItem.proposedAdjustment > 0 ? 'text-green-400' : 'text-slate-400'
                    )}>
                      {caseItem.proposedAdjustment > 0
                        ? formatCurrency(caseItem.proposedAdjustment)
                        : '—'
                      }
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Workload */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Team Workload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoUsers
              .filter(u => u.role === 'senior_assessor' || u.role === 'tax_officer')
              .map((user) => {
                const userCases = auditCases.filter(c => c.assignedTo === user.id);
                const capacity = (userCases.length / 15) * 100;

                return (
                  <div key={user.id} className="flex items-center gap-4">
                    <span className="text-slate-300 w-40">{user.name}</span>
                    <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          capacity > 80 ? 'bg-red-500' :
                          capacity > 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        )}
                        style={{ width: `${Math.min(capacity, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-24 text-right">
                      {userCases.length} cases ({Math.round(capacity)}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
