export type UserRole =
  | 'tax_officer'
  | 'senior_assessor'
  | 'audit_manager'
  | 'policy_analyst'
  | 'department_head'
  | 'system_admin';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  phone?: string;
  permissions: string[];
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUser: (userId: string) => void;
}
