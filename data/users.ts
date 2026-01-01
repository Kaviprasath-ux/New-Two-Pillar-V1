import { User } from '@/types/auth';

export const demoUsers: (User & { password: string })[] = [
  {
    id: 'user-001',
    employeeId: 'TO-2024-0142',
    name: 'Fatima Al-Hassan',
    email: 'fatima.hassan@taxauthority.gov',
    password: 'demo123',
    role: 'tax_officer',
    department: 'DMTT Processing Unit',
    avatar: 'FH',
    phone: '+971 50 123 4567',
    permissions: ['filings.view', 'filings.edit', 'cases.view', 'cases.create'],
    isActive: true,
  },
  {
    id: 'user-002',
    employeeId: 'SA-2024-0089',
    name: 'Omar Khalid',
    email: 'omar.khalid@taxauthority.gov',
    password: 'demo123',
    role: 'senior_assessor',
    department: 'International Tax Audit',
    avatar: 'OK',
    phone: '+971 50 234 5678',
    permissions: ['filings.*', 'cases.*', 'workbench.*', 'assessments.create', 'evidence.*'],
    isActive: true,
  },
  {
    id: 'user-003',
    employeeId: 'AM-2024-0023',
    name: 'Dr. Aisha Rahman',
    email: 'aisha.rahman@taxauthority.gov',
    password: 'demo123',
    role: 'audit_manager',
    department: 'International Tax Audit',
    avatar: 'AR',
    phone: '+971 50 345 6789',
    permissions: ['*'],
    isActive: true,
  },
  {
    id: 'user-004',
    employeeId: 'PA-2024-0056',
    name: 'Yusuf Ibrahim',
    email: 'yusuf.ibrahim@taxauthority.gov',
    password: 'demo123',
    role: 'policy_analyst',
    department: 'Tax Policy & Research',
    avatar: 'YI',
    phone: '+971 50 456 7890',
    permissions: ['filings.view', 'mne.view', 'reports.*', 'analytics.*'],
    isActive: true,
  },
  {
    id: 'user-005',
    employeeId: 'DH-2024-0001',
    name: 'Abdullah Al-Mansouri',
    email: 'abdullah.mansouri@taxauthority.gov',
    password: 'demo123',
    role: 'department_head',
    department: 'Executive Office',
    avatar: 'AM',
    phone: '+971 50 567 8901',
    permissions: ['*.view', 'assessments.approve', 'cases.approve'],
    isActive: true,
  },
  {
    id: 'user-006',
    employeeId: 'IT-2024-0012',
    name: 'Mohammed Tech',
    email: 'admin@taxauthority.gov',
    password: 'demo123',
    role: 'system_admin',
    department: 'IT Services',
    avatar: 'MT',
    phone: '+971 50 678 9012',
    permissions: ['settings.*', 'users.*', 'logs.*', 'integrations.*'],
    isActive: true,
  },
];

// Helper to get user without password
export function getUserById(id: string): User | undefined {
  const user = demoUsers.find(u => u.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return undefined;
}

// Helper to validate credentials
export function validateCredentials(email: string, password: string): User | null {
  const user = demoUsers.find(u => u.email === email && u.password === password);
  if (user && user.isActive) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}
