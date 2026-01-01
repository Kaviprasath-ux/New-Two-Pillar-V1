// User and Role Types
export type UserRole =
  | 'tax_officer'
  | 'senior_assessor'
  | 'audit_manager'
  | 'policy_analyst'
  | 'department_head'
  | 'system_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  employeeId: string;
  avatar: string;
  assignedCases: string[];
  lastLogin: string;
}

// MNE Types
export interface MNEGroup {
  id: string;
  name: string;
  tin: string;
  ultimateParent: string;
  ultimateParentJurisdiction: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'under_review';
  riskScore: 'low' | 'medium' | 'high' | 'critical';
  riskScoreValue: number;
  totalRevenue: number;
  constituentsInJurisdiction: number;
  sector: string;
  lastFilingDate: string;
  complianceScore: number;
}

// Filing Types
export type FilingStatus = 'received' | 'validating' | 'under_review' | 'verified' | 'assessed' | 'disputed';
export type FilingType = 'DMTT_Return' | 'DMTT_Amendment' | 'Information_Return';
export type ValidationStatus = 'pending' | 'passed' | 'failed' | 'warnings';
export type Priority = 'normal' | 'high' | 'urgent';

export interface Filing {
  id: string;
  mneGroupId: string;
  mneGroupName: string;
  fiscalYear: string;
  filingType: FilingType;
  submissionDate: string;
  status: FilingStatus;
  assignedTo: string | null;
  dueDate: string;
  isLate: boolean;
  globeIncome: number;
  coveredTaxes: number;
  reportedETR: number;
  reportedTopUpTax: number;
  validationStatus: ValidationStatus;
  validationErrors: number;
  validationWarnings: number;
  hasDiscrepancies: boolean;
  flaggedForAudit: boolean;
  priority: Priority;
}

// Audit Case Types
export type CaseType = 'desk_review' | 'field_audit' | 'comprehensive_audit';
export type CaseStatus = 'open' | 'in_progress' | 'pending_response' | 'assessment_draft' | 'closed';
export type CasePriority = 'low' | 'medium' | 'high' | 'critical';

export interface AuditCase {
  id: string;
  caseNumber: string;
  mneGroupId: string;
  mneGroupName: string;
  fiscalYear: string;
  caseType: CaseType;
  status: CaseStatus;
  assignedTo: string;
  assignedToName: string;
  openedDate: string;
  dueDate: string;
  priority: CasePriority;
  originalTopUpTax: number;
  adjustedTopUpTax: number;
  proposedAdjustment: number;
  lastActivity: string;
  nextAction: string;
  documentsCount: number;
}

// Assessment Types
export type AssessmentStatus = 'draft' | 'pending_approval' | 'issued' | 'paid' | 'partially_paid' | 'disputed' | 'written_off';

export interface Assessment {
  id: string;
  assessmentNumber: string;
  caseId: string;
  mneGroupId: string;
  mneGroupName: string;
  fiscalYear: string;
  originalAmount: number;
  adjustedAmount: number;
  additionalTax: number;
  penalties: number;
  interest: number;
  totalAssessed: number;
  status: AssessmentStatus;
  issuedDate: string | null;
  dueDate: string | null;
  paidAmount: number;
  outstandingAmount: number;
  preparedBy: string;
  reviewedBy: string | null;
  approvedBy: string | null;
}

// Validation Types
export type ValidationSeverity = 'error' | 'warning' | 'info';
export type ValidationCategory = 'completeness' | 'accuracy' | 'consistency' | 'cross_reference';

export interface ValidationResult {
  ruleId: string;
  ruleName: string;
  category: ValidationCategory;
  severity: ValidationSeverity;
  field: string;
  message: string;
  reportedValue: string | number;
  expectedValue?: string | number;
  status: 'open' | 'resolved' | 'accepted';
}

// Calculation Trace Types
export interface CalculationLineItem {
  id: string;
  label: string;
  description?: string;
  reportedValue: number;
  verifiedValue: number;
  variance: number;
  variancePercentage: number;
  hasVariance: boolean;
  adjustmentReason?: string;
  ruleReference?: string;
}

export interface CalculationStep {
  stepNumber: number;
  title: string;
  status: 'verified' | 'adjusted' | 'error';
  ruleReference: string;
  ruleArticle: string;
  lineItems: CalculationLineItem[];
  reportedTotal: number;
  verifiedTotal: number;
  variance: number;
  notes: string[];
  sourceDocuments: { id: string; name: string }[];
}

// Activity Types
export interface Activity {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  priority: 'normal' | 'high' | 'medium';
}

// Global Stats
export interface GlobalStats {
  totalFilingsThisYear: number;
  pendingReview: number;
  underAudit: number;
  completedAudits: number;
  totalDMTTCollected: number;
  pendingCollection: number;
  assessmentsIssued: number;
  complianceRate: number;
  onTimeFilingRate: number;
  auditYieldRate: number;
  registeredMNEs: number;
  activeMNEs: number;
  highRiskMNEs: number;
}

// Permission Types
export type Action = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';
export type Module =
  | 'dashboard' | 'filings' | 'mne' | 'cases' | 'workbench'
  | 'assessments' | 'evidence' | 'revenue' | 'disputes'
  | 'reports' | 'analytics' | 'integrations' | 'settings' | 'users' | 'logs';

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  export: boolean;
}
