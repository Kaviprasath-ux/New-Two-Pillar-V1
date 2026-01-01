"use client"

import { BarChart3, Download, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const reports = [
  { name: 'Monthly Statistics Report', type: 'Monthly', lastGenerated: 'Oct 1, 2024', format: 'PDF' },
  { name: 'Compliance Summary', type: 'Quarterly', lastGenerated: 'Sep 30, 2024', format: 'Excel' },
  { name: 'Audit Yield Analysis', type: 'Monthly', lastGenerated: 'Oct 15, 2024', format: 'PDF' },
  { name: 'OECD Reporting Package', type: 'Annual', lastGenerated: 'Jan 15, 2024', format: 'XML' },
  { name: 'Revenue Forecast', type: 'Quarterly', lastGenerated: 'Oct 1, 2024', format: 'Excel' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <BarChart3 className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Reports</h1>
            <p className="text-slate-400">Generate and download reports</p>
          </div>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Report
        </Button>
      </div>

      {/* Standard Reports */}
      <Card className="bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Standard Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{report.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{report.type}</Badge>
                      <span className="text-xs text-slate-400">
                        Last: {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{report.format}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm">Generate</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="bg-slate-800/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Scheduled Reports</CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-400">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No scheduled reports</p>
            <Button variant="outline" className="mt-4">
              Schedule Your First Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
