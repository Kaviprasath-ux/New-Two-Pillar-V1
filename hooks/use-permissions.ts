'use client';

import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth';

export type Action = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';
export type Module =
  | 'dashboard' | 'filings' | 'mne' | 'cases' | 'workbench'
  | 'assessments' | 'evidence' | 'revenue' | 'disputes'
  | 'reports' | 'analytics' | 'integrations' | 'settings' | 'users' | 'logs';

const permissionMatrix: Record<UserRole, Record<Module, Record<Action, boolean>>> = {
  tax_officer: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    filings:      { view: true,  create: false, edit: true,  delete: false, approve: false, export: true  },
    mne:          { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    cases:        { view: true,  create: true,  edit: true,  delete: false, approve: false, export: false },
    workbench:    { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    assessments:  { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    evidence:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    revenue:      { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    disputes:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    reports:      { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    analytics:    { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    integrations: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    settings:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    users:        { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    logs:         { view: false, create: false, edit: false, delete: false, approve: false, export: false },
  },
  senior_assessor: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    filings:      { view: true,  create: false, edit: true,  delete: false, approve: false, export: true  },
    mne:          { view: true,  create: false, edit: true,  delete: false, approve: false, export: true  },
    cases:        { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    workbench:    { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    assessments:  { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    evidence:     { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    revenue:      { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    disputes:     { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    reports:      { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    analytics:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    integrations: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    settings:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    users:        { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    logs:         { view: false, create: false, edit: false, delete: false, approve: false, export: false },
  },
  audit_manager: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    filings:      { view: true,  create: false, edit: true,  delete: false, approve: true,  export: true  },
    mne:          { view: true,  create: true,  edit: true,  delete: false, approve: true,  export: true  },
    cases:        { view: true,  create: true,  edit: true,  delete: true,  approve: true,  export: true  },
    workbench:    { view: true,  create: true,  edit: true,  delete: true,  approve: true,  export: true  },
    assessments:  { view: true,  create: true,  edit: true,  delete: true,  approve: true,  export: true  },
    evidence:     { view: true,  create: true,  edit: true,  delete: true,  approve: true,  export: true  },
    revenue:      { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    disputes:     { view: true,  create: true,  edit: true,  delete: true,  approve: true,  export: true  },
    reports:      { view: true,  create: true,  edit: false, delete: false, approve: false, export: true  },
    analytics:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    integrations: { view: true,  create: false, edit: true,  delete: false, approve: false, export: false },
    settings:     { view: true,  create: false, edit: true,  delete: false, approve: false, export: false },
    users:        { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    logs:         { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
  },
  policy_analyst: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    filings:      { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    mne:          { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    cases:        { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    workbench:    { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    assessments:  { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    evidence:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    revenue:      { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    disputes:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    reports:      { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    analytics:    { view: true,  create: true,  edit: true,  delete: false, approve: false, export: true  },
    integrations: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    settings:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    users:        { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    logs:         { view: false, create: false, edit: false, delete: false, approve: false, export: false },
  },
  department_head: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    filings:      { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    mne:          { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    cases:        { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    workbench:    { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    assessments:  { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    evidence:     { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    revenue:      { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    disputes:     { view: true,  create: false, edit: false, delete: false, approve: true,  export: true  },
    reports:      { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    analytics:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    integrations: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    settings:     { view: true,  create: false, edit: true,  delete: false, approve: true,  export: false },
    users:        { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    logs:         { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
  },
  system_admin: {
    dashboard:    { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    filings:      { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    mne:          { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    cases:        { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    workbench:    { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    assessments:  { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    evidence:     { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    revenue:      { view: true,  create: false, edit: false, delete: false, approve: false, export: false },
    disputes:     { view: false, create: false, edit: false, delete: false, approve: false, export: false },
    reports:      { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    analytics:    { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
    integrations: { view: true,  create: true,  edit: true,  delete: true,  approve: false, export: true  },
    settings:     { view: true,  create: true,  edit: true,  delete: true,  approve: false, export: true  },
    users:        { view: true,  create: true,  edit: true,  delete: true,  approve: false, export: true  },
    logs:         { view: true,  create: false, edit: false, delete: false, approve: false, export: true  },
  },
};

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (module: Module, action: Action): boolean => {
    if (!user) return false;
    return permissionMatrix[user.role]?.[module]?.[action] ?? false;
  };

  const canAccess = (module: Module): boolean => {
    return hasPermission(module, 'view');
  };

  const canCreate = (module: Module): boolean => {
    return hasPermission(module, 'create');
  };

  const canEdit = (module: Module): boolean => {
    return hasPermission(module, 'edit');
  };

  const canDelete = (module: Module): boolean => {
    return hasPermission(module, 'delete');
  };

  const canApprove = (module: Module): boolean => {
    return hasPermission(module, 'approve');
  };

  const canExport = (module: Module): boolean => {
    return hasPermission(module, 'export');
  };

  return {
    hasPermission,
    canAccess,
    canCreate,
    canEdit,
    canDelete,
    canApprove,
    canExport,
    userRole: user?.role,
  };
}
