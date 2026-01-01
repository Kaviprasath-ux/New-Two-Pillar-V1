"use client"

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { auditCases } from '@/data/mock-data';
import { formatDate, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const statusConfig = {
  open: { label: 'Open', variant: 'outline' as const },
  in_progress: { label: 'In Progress', variant: 'default' as const },
  pending_response: { label: 'Pending Response', variant: 'warning' as const },
  assessment_draft: { label: 'Assessment Draft', variant: 'secondary' as const },
  closed: { label: 'Closed', variant: 'success' as const },
};

const priorityConfig = {
  low: { color: 'text-slate-400' },
  medium: { color: 'text-yellow-400' },
  high: { color: 'text-orange-400' },
  critical: { color: 'text-red-400' },
};

export function AssignedCasesTable() {
  return (
    <Card className="bg-slate-800/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">My Assigned Cases</CardTitle>
        <Link href="/audit/cases">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Case #</TableHead>
              <TableHead>MNE Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Proposed Adj.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditCases.map((caseItem) => {
              const status = statusConfig[caseItem.status];
              const priority = priorityConfig[caseItem.priority];
              const dueDate = new Date(caseItem.dueDate);
              const today = new Date();
              const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

              return (
                <TableRow key={caseItem.id}>
                  <TableCell>
                    <Link href={`/audit/cases/${caseItem.id}`} className="hover:text-blue-400">
                      <span className={cn('font-medium', priority.color)}>
                        {caseItem.caseNumber}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{caseItem.mneGroupName}</p>
                      <p className="text-xs text-slate-400">{caseItem.fiscalYear}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      daysUntilDue < 14 ? 'text-yellow-400' :
                      daysUntilDue < 7 ? 'text-red-400' :
                      'text-slate-300'
                    )}>
                      {formatDate(caseItem.dueDate)}
                      {daysUntilDue <= 14 && (
                        <span className="block text-xs">
                          {daysUntilDue} days left
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {caseItem.proposedAdjustment > 0 ? (
                      <span className="font-mono text-green-400">
                        {formatCurrency(caseItem.proposedAdjustment)}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
