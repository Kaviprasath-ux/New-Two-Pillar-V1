"use client"

import { Scale, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/layout/app-shell';

export default function Disputes() {
  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-orange-500/10">
          <Scale className="h-6 w-6 text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Disputes & Appeals</h1>
          <p className="text-slate-400">Manage objections and appeal cases</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-800/50">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-white">3</p>
            <p className="text-slate-400 mt-1">Active Disputes</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-white">1</p>
            <p className="text-slate-400 mt-1">Pending Appeals</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-white">12</p>
            <p className="text-slate-400 mt-1">Resolved This Year</p>
          </CardContent>
        </Card>
      </div>

      {/* Disputes List */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Active Disputes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">Global Tech Industries Ltd</span>
                  <Badge variant="warning">Under Review</Badge>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  Dispute on dividend exclusion disallowance
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Disputed Amount</p>
                <p className="font-mono text-lg font-semibold text-yellow-400">AED 4.7M</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
