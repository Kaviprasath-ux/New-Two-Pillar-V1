"use client"

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' }> = {
  // Filing statuses
  received: { label: 'Received', variant: 'outline' },
  validating: { label: 'Validating', variant: 'secondary' },
  under_review: { label: 'Under Review', variant: 'warning' },
  verified: { label: 'Verified', variant: 'success' },
  assessed: { label: 'Assessed', variant: 'default' },
  disputed: { label: 'Disputed', variant: 'destructive' },

  // Validation statuses
  pending: { label: 'Pending', variant: 'outline' },
  passed: { label: 'Passed', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  warnings: { label: 'Warnings', variant: 'warning' },

  // Case statuses
  open: { label: 'Open', variant: 'outline' },
  in_progress: { label: 'In Progress', variant: 'default' },
  pending_response: { label: 'Pending Response', variant: 'warning' },
  assessment_draft: { label: 'Assessment Draft', variant: 'secondary' },
  closed: { label: 'Closed', variant: 'success' },

  // Assessment statuses
  draft: { label: 'Draft', variant: 'outline' },
  pending_approval: { label: 'Pending Approval', variant: 'warning' },
  issued: { label: 'Issued', variant: 'default' },
  paid: { label: 'Paid', variant: 'success' },
  partially_paid: { label: 'Partially Paid', variant: 'warning' },
  written_off: { label: 'Written Off', variant: 'secondary' },

  // MNE statuses
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'secondary' },

  // Risk levels
  low: { label: 'Low', variant: 'success' },
  medium: { label: 'Medium', variant: 'warning' },
  high: { label: 'High', variant: 'destructive' },
  critical: { label: 'Critical', variant: 'destructive' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'outline' as const };

  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
