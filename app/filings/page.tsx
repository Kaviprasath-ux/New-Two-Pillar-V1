"use client"

import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
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
import { FilingTable } from '@/components/filings/filing-table';
import { filings } from '@/data/mock-data';

export default function FilingRegistry() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredFilings = filings.filter((filing) => {
    if (statusFilter !== 'all' && filing.status !== statusFilter) return false;
    if (typeFilter !== 'all' && filing.filingType !== typeFilter) return false;
    return true;
  });

  const statusCounts = filings.reduce((acc, filing) => {
    acc[filing.status] = (acc[filing.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Filing Registry</h1>
          <p className="text-slate-400">All DMTT filings for FY2024</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Manual Entry
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Badge variant="outline" className="px-4 py-2 text-sm">
          Total: {filings.length}
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          Received: {statusCounts.received || 0}
        </Badge>
        <Badge variant="warning" className="px-4 py-2 text-sm">
          Under Review: {statusCounts.under_review || 0}
        </Badge>
        <Badge variant="success" className="px-4 py-2 text-sm">
          Verified: {statusCounts.verified || 0}
        </Badge>
        <Badge variant="destructive" className="px-4 py-2 text-sm">
          Late: {filings.filter(f => f.isLate).length}
        </Badge>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by MNE name or filing ID..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="validating">Validating</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="assessed">Assessed</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="DMTT_Return">DMTT Return</SelectItem>
                <SelectItem value="DMTT_Amendment">DMTT Amendment</SelectItem>
                <SelectItem value="Information_Return">Information Return</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>

            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filing Table */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-0">
          <FilingTable filings={filteredFilings} />
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Showing 1-{filteredFilings.length} of {filings.length} filings</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
