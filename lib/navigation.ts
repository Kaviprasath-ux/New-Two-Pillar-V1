import {
  LayoutDashboard,
  Inbox,
  FileStack,
  FileCheck,
  Building2,
  AlertTriangle,
  Briefcase,
  Search,
  FileText,
  Archive,
  DollarSign,
  Scale,
  BarChart3,
  TrendingUp,
  Plug,
  Settings,
  Users,
  History,
  type LucideIcon
} from 'lucide-react';
import type { UserRole } from '@/types';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  badgeVariant?: 'default' | 'warning' | 'danger';
  roles: (UserRole | '*')[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navigationConfig: NavSection[] = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Command Center', href: '/', icon: LayoutDashboard, roles: ['*'] },
    ],
  },
  {
    label: 'FILINGS',
    items: [
      { name: 'Incoming Filings', href: '/filings/incoming', icon: Inbox, badge: 23, badgeVariant: 'warning', roles: ['tax_officer', 'senior_assessor', 'audit_manager', 'department_head'] },
      { name: 'Filing Registry', href: '/filings', icon: FileStack, roles: ['tax_officer', 'senior_assessor', 'audit_manager', 'policy_analyst', 'department_head'] },
      { name: 'Verification Queue', href: '/filings/verification', icon: FileCheck, badge: 8, roles: ['tax_officer', 'senior_assessor', 'audit_manager'] },
    ],
  },
  {
    label: 'TAXPAYERS',
    items: [
      { name: 'MNE Registry', href: '/mne', icon: Building2, roles: ['tax_officer', 'senior_assessor', 'audit_manager', 'policy_analyst', 'department_head'] },
      { name: 'Risk Profiles', href: '/mne/risk', icon: AlertTriangle, badge: 34, badgeVariant: 'danger', roles: ['senior_assessor', 'audit_manager', 'policy_analyst', 'department_head'] },
    ],
  },
  {
    label: 'AUDIT',
    items: [
      { name: 'Case Management', href: '/audit/cases', icon: Briefcase, badge: 12, roles: ['tax_officer', 'senior_assessor', 'audit_manager', 'department_head'] },
      { name: 'Audit Workbench', href: '/audit/workbench', icon: Search, roles: ['senior_assessor', 'audit_manager'] },
      { name: 'Assessments', href: '/audit/assessments', icon: FileText, badge: 5, badgeVariant: 'warning', roles: ['senior_assessor', 'audit_manager', 'department_head'] },
      { name: 'Evidence Binder', href: '/audit/evidence', icon: Archive, roles: ['senior_assessor', 'audit_manager', 'department_head'] },
    ],
  },
  {
    label: 'REVENUE',
    items: [
      { name: 'Collections', href: '/revenue', icon: DollarSign, roles: ['audit_manager', 'policy_analyst', 'department_head'] },
      { name: 'Disputes', href: '/disputes', icon: Scale, badge: 3, roles: ['senior_assessor', 'audit_manager', 'department_head'] },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['audit_manager', 'policy_analyst', 'department_head'] },
      { name: 'Analytics', href: '/analytics', icon: TrendingUp, roles: ['policy_analyst', 'department_head'] },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Integrations', href: '/integrations', icon: Plug, roles: ['audit_manager', 'system_admin'] },
      { name: 'User Management', href: '/admin/users', icon: Users, roles: ['system_admin'] },
      { name: 'Settings', href: '/settings', icon: Settings, roles: ['audit_manager', 'system_admin'] },
      { name: 'Audit Logs', href: '/admin/logs', icon: History, roles: ['audit_manager', 'system_admin'] },
    ],
  },
];

export function getNavigationForRole(role: UserRole): NavSection[] {
  return navigationConfig
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.roles.includes('*') || item.roles.includes(role)
      ),
    }))
    .filter((section) => section.items.length > 0);
}
