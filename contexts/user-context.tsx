"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { demoUsers } from '@/data/mock-data';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  allUsers: User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(demoUsers[1]); // Omar Khalid (Senior Assessor) by default

  const switchRole = (role: UserRole) => {
    const userWithRole = demoUsers.find(u => u.role === role);
    if (userWithRole) {
      setCurrentUser(userWithRole);
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      allUsers: demoUsers
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    tax_officer: 'Tax Officer',
    senior_assessor: 'Senior Assessor',
    audit_manager: 'Audit Manager',
    policy_analyst: 'Policy Analyst',
    department_head: 'Department Head',
    system_admin: 'System Admin',
  };
  return roleNames[role];
}
