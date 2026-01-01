"use client"

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { TooltipProvider } from '@/components/ui/tooltip';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <ProtectedRoute>
      <TooltipProvider>
        <div className="flex h-screen bg-slate-950 text-slate-100">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ProtectedRoute>
  );
}
