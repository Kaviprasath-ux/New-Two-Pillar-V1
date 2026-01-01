"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronRight, AlertTriangle, CheckCircle, XCircle, FileText, ExternalLink, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { auditCalculationTrace, auditCases } from '@/data/mock-data';
import { AppShell } from '@/components/layout/app-shell';

export default function AuditWorkbench() {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]);
  const caseItem = auditCases[0]; // Default to first case

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const statusConfig = {
    verified: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Verified' },
    adjusted: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Adjusted' },
    error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Error' },
  };

  return (
    <AppShell>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/audit/cases/${caseItem.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Audit Workbench</h1>
            <p className="text-slate-400">{caseItem.caseNumber} · {auditCalculationTrace.mneGroup}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Assessment Draft
          </Button>
        </div>
      </div>

      {/* Variance Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Reported Top-Up Tax</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatCurrency(auditCalculationTrace.reportedValues.topUpTax)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50">
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Verified Top-Up Tax</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatCurrency(auditCalculationTrace.verifiedValues.topUpTax)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border border-green-500/20">
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Proposed Adjustment</p>
            <p className="text-2xl font-bold text-green-400 mt-1 flex items-center gap-2">
              +{formatCurrency(auditCalculationTrace.verifiedValues.topUpTax - auditCalculationTrace.reportedValues.topUpTax)}
              <AlertTriangle className="h-5 w-5" />
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calculation Steps */}
      <div className="space-y-4">
        {auditCalculationTrace.steps.map((step) => {
          const isExpanded = expandedSteps.includes(step.stepNumber);
          const status = statusConfig[step.status];
          const StatusIcon = status.icon;

          return (
            <Card key={step.stepNumber} className="bg-slate-800/50">
              {/* Step Header */}
              <button
                onClick={() => toggleStep(step.stepNumber)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        Step {step.stepNumber}: {step.title}
                      </span>
                      <Badge variant="outline" className={cn(status.bg, status.color, 'border-0')}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                      {step.ruleReference}, {step.ruleArticle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <p className="text-slate-400">Reported</p>
                    <p className="font-mono text-white">
                      {typeof step.reportedTotal === 'number' && step.reportedTotal >= 1000
                        ? formatCurrency(step.reportedTotal)
                        : `${step.reportedTotal}%`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Verified</p>
                    <p className="font-mono text-white">
                      {typeof step.verifiedTotal === 'number' && step.verifiedTotal >= 1000
                        ? formatCurrency(step.verifiedTotal)
                        : `${step.verifiedTotal}%`
                      }
                    </p>
                  </div>
                  {step.variance !== 0 && (
                    <div className="text-right">
                      <p className="text-slate-400">Variance</p>
                      <p className={cn(
                        'font-mono',
                        step.variance > 0 ? 'text-red-400' : 'text-green-400'
                      )}>
                        {typeof step.variance === 'number' && Math.abs(step.variance) >= 1000
                          ? (step.variance > 0 ? '+' : '') + formatCurrency(step.variance)
                          : `${step.variance > 0 ? '+' : ''}${step.variance}%`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <CardContent className="p-4 pt-0 border-t border-slate-700">
                  {/* Line Items Table */}
                  <table className="w-full mt-4">
                    <thead>
                      <tr className="text-sm text-slate-400 border-b border-slate-700">
                        <th className="text-left pb-2 font-medium">Line Item</th>
                        <th className="text-right pb-2 font-medium">Reported</th>
                        <th className="text-right pb-2 font-medium">Verified</th>
                        <th className="text-right pb-2 font-medium">Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {step.lineItems.map((item) => (
                        <tr key={item.id} className="border-b border-slate-800">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {item.hasVariance && (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                              <div>
                                <p className="text-white">{item.label}</p>
                                {item.description && (
                                  <p className="text-sm text-slate-400">{item.description}</p>
                                )}
                                {item.hasVariance && item.adjustmentReason && (
                                  <div className="mt-2 p-2 bg-yellow-500/10 rounded text-sm">
                                    <p className="text-yellow-400 font-medium">Adjustment Reason:</p>
                                    <p className="text-slate-300">{item.adjustmentReason}</p>
                                    {item.ruleReference && (
                                      <p className="text-slate-400 mt-1">
                                        Rule: <span className="text-blue-400">{item.ruleReference}</span>
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-right font-mono text-slate-300">
                            {Math.abs(item.reportedValue) >= 1000
                              ? formatCurrency(item.reportedValue)
                              : `${item.reportedValue}%`
                            }
                          </td>
                          <td className="py-3 text-right font-mono text-slate-300">
                            {Math.abs(item.verifiedValue) >= 1000
                              ? formatCurrency(item.verifiedValue)
                              : `${item.verifiedValue}%`
                            }
                          </td>
                          <td className={cn(
                            'py-3 text-right font-mono',
                            item.variance > 0 ? 'text-red-400' :
                            item.variance < 0 ? 'text-green-400' : 'text-slate-400'
                          )}>
                            {item.variance !== 0 ? (
                              Math.abs(item.variance) >= 1000
                                ? (item.variance > 0 ? '+' : '') + formatCurrency(item.variance)
                                : `${item.variance > 0 ? '+' : ''}${item.variance}%`
                            ) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Notes and Source Documents */}
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {step.notes.length > 0 && (
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-sm font-medium text-slate-300 mb-2">Notes:</p>
                        <ul className="text-sm text-slate-400 space-y-1">
                          {step.notes.map((note, i) => (
                            <li key={i}>• {note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.sourceDocuments.length > 0 && (
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-sm font-medium text-slate-300 mb-2">Source Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.sourceDocuments.map((doc) => (
                            <Button key={doc.id} variant="outline" size="sm" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg">
        <div className="flex gap-2">
          <Button variant="outline">Request Documents</Button>
          <Button variant="outline">Add Finding</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
          <Link href="/audit/assessments">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Assessment Draft
            </Button>
          </Link>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
