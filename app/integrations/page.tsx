"use client"

import { Plug, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/layout/app-shell';

const integrations = [
  {
    name: 'SAP TRM',
    description: 'Tax Revenue Management System',
    status: 'connected',
    lastSync: '2024-10-20T16:30:00Z',
  },
  {
    name: 'CbCR Exchange',
    description: 'Country-by-Country Report Data',
    status: 'connected',
    lastSync: '2024-10-20T08:00:00Z',
  },
  {
    name: 'Company Registry',
    description: 'Business Registration Data',
    status: 'connected',
    lastSync: '2024-10-19T12:00:00Z',
  },
  {
    name: 'Banking Data',
    description: 'Financial Institution Reports',
    status: 'warning',
    lastSync: '2024-10-15T10:00:00Z',
  },
];

export default function Integrations() {
  return (
    <AppShell>
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-purple-500/10">
          <Plug className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-slate-400">External system connections and data sync</p>
        </div>
      </div>

      {/* Integrations List */}
      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.name} className="bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{integration.name}</h3>
                    <Badge variant={integration.status === 'connected' ? 'success' : 'warning'}>
                      {integration.status === 'connected' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Attention
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{integration.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sync History */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recent Sync Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'Payment', ref: 'PMT-2024-00234', status: 'Success', time: '16:30' },
              { type: 'Assessment', ref: 'DMTT-ASMT-2024-0001', status: 'Pending', time: '15:00' },
              { type: 'Filing', ref: 'DMTT-FIL-2024-00001', status: 'Success', time: '14:35' },
              { type: 'MNE Data', ref: 'Bulk Sync', status: 'Success', time: '08:00' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                <div>
                  <p className="font-medium text-white">{item.type}</p>
                  <p className="text-sm text-slate-400">{item.ref}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={item.status === 'Success' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                  <span className="text-sm text-slate-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </AppShell>
  );
}
