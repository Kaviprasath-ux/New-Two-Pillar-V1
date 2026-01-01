"use client"

import Link from 'next/link';
import { AlertTriangle, ExternalLink, Search } from 'lucide-react';
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
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDate, formatCurrency, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Filing } from '@/types';

interface FilingTableProps {
  filings: Filing[];
}

export function FilingTable({ filings }: FilingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Filing ID</TableHead>
          <TableHead>MNE Group</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Reported ETR</TableHead>
          <TableHead className="text-right">Top-Up Tax</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Flags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filings.map((filing) => (
          <TableRow key={filing.id}>
            <TableCell>
              <Link
                href={`/filings/${filing.id}`}
                className="font-mono text-blue-400 hover:text-blue-300"
              >
                {filing.id.toUpperCase()}
              </Link>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium text-white">{filing.mneGroupName}</p>
                <p className="text-xs text-slate-400">{filing.fiscalYear}</p>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-slate-300">
                {filing.filingType.replace('_', ' ')}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className={cn(
                'font-mono',
                filing.reportedETR < 15 ? 'text-yellow-400' : 'text-slate-300'
              )}>
                {formatPercentage(filing.reportedETR)}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className="font-mono text-slate-300">
                {formatCurrency(filing.reportedTopUpTax)}
              </span>
            </TableCell>
            <TableCell>
              <StatusBadge status={filing.status} />
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {filing.isLate && (
                  <Badge variant="destructive" className="text-xs">Late</Badge>
                )}
                {filing.hasDiscrepancies && (
                  <span className="text-yellow-400" title="Has discrepancies">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                )}
                {filing.flaggedForAudit && (
                  <span className="text-blue-400" title="Flagged for audit">
                    <Search className="h-4 w-4" />
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/filings/${filing.id}`}>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
