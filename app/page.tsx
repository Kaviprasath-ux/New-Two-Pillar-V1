"use client"

import { FileStack, Clock, Search, DollarSign, Percent } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { FilingPipeline } from '@/components/dashboard/filing-pipeline';
import { PriorityQueue } from '@/components/dashboard/priority-queue';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AssignedCasesTable } from '@/components/dashboard/assigned-cases-table';
import { globalStats } from '@/data/mock-data';
import { formatCompactNumber } from '@/lib/utils';

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-slate-400">DMTT Administration Overview - FY2024</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="FILINGS RECEIVED"
          value={globalStats.totalFilingsThisYear}
          icon={FileStack}
          trend={{ value: '12% YoY', positive: true }}
        />
        <StatCard
          title="PENDING REVIEW"
          value={globalStats.pendingReview}
          icon={Clock}
          alert={{ text: '8 urgent items', variant: 'danger' }}
        />
        <StatCard
          title="UNDER AUDIT"
          value={globalStats.underAudit}
          icon={Search}
          subtitle={`AED ${formatCompactNumber(globalStats.assessmentsIssued)} exposure`}
        />
        <StatCard
          title="DMTT COLLECTED"
          value={`AED ${formatCompactNumber(globalStats.totalDMTTCollected)}`}
          icon={DollarSign}
          trend={{ value: '34% YoY', positive: true }}
        />
        <StatCard
          title="COMPLIANCE RATE"
          value={`${globalStats.complianceRate}%`}
          icon={Percent}
          trend={{ value: '2.1%', positive: true }}
        />
      </div>

      {/* Pipeline and Priority Queue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FilingPipeline />
        <PriorityQueue />
      </div>

      {/* Revenue Chart and Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <ActivityFeed />
      </div>

      {/* Assigned Cases Table */}
      <AssignedCasesTable />
    </div>
  );
}
