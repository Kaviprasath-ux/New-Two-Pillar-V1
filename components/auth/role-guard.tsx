'use client';

import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="p-8">
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this page.
            Your role ({user.role.replace('_', ' ')}) is not authorized for this section.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
