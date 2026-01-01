"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Search, Plus, Download, ExternalLink } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCompactNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { mneGroups, riskDistribution, sectorBreakdown } from '@/data/mock-data';

export default function MNERegistry() {
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const filteredMNEs = mneGroups.filter((mne) => {
    if (riskFilter !== 'all' && mne.riskScore !== riskFilter) return false;
    if (sectorFilter !== 'all' && mne.sector !== sectorFilter) return false;
    return true;
  });

  const sectors = Array.from(new Set(mneGroups.map(m => m.sector)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Building2 className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MNE Registry</h1>
            <p className="text-slate-400">Registered multinational enterprise groups</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Register New MNE
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or TIN..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500"
              />
            </div>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-36 bg-slate-700 border-slate-600">
                <SelectValue placeholder="All Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-44 bg-slate-700 border-slate-600">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MNE Table */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>MNE Group</TableHead>
                <TableHead>TIN</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMNEs.map((mne) => (
                <TableRow key={mne.id}>
                  <TableCell>
                    <div>
                      <Link
                        href={`/mne/${mne.id}`}
                        className="font-medium text-white hover:text-blue-400"
                      >
                        {mne.name}
                      </Link>
                      <p className="text-xs text-slate-400">
                        UPE: {mne.ultimateParentJurisdiction} | {mne.constituentsInJurisdiction} entities
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-slate-300">{mne.tin}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-300">{mne.sector}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={mne.riskScore} />
                      <span className="text-xs text-slate-400">({mne.riskScoreValue})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            mne.complianceScore >= 80 ? 'bg-green-500' :
                            mne.complianceScore >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          )}
                          style={{ width: `${mne.complianceScore}%` }}
                        />
                      </div>
                      <span className={cn(
                        'text-sm font-medium',
                        mne.complianceScore >= 80 ? 'text-green-400' :
                        mne.complianceScore >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      )}>
                        {mne.complianceScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/mne/${mne.id}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Distribution */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskDistribution.map((risk) => (
                <div key={risk.name} className="flex items-center gap-4">
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    risk.name === 'Critical' || risk.name === 'High' ? 'bg-red-500' :
                    risk.name === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  )} />
                  <span className="text-slate-300 w-20">{risk.name}</span>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        risk.name === 'Critical' || risk.name === 'High' ? 'bg-red-500' :
                        risk.name === 'Medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      )}
                      style={{ width: `${risk.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-20 text-right">
                    {risk.count} ({risk.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Breakdown */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Sector Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sectorBreakdown.map((sector) => (
                <div key={sector.name} className="flex items-center gap-4">
                  <span className="text-slate-300 w-24">{sector.name}</span>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${sector.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-16 text-right">
                    {sector.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Showing 1-{filteredMNEs.length} of {mneGroups.length} MNE groups</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
