'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { Building2, Shield } from 'lucide-react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f172a] to-[#0a0e17] p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DMTT Administration</h1>
              <p className="text-sm text-slate-400">Pillar Two Compliance Platform</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Domestic Minimum<br />Top-Up Tax<br />
              <span className="text-blue-500">Administration Portal</span>
            </h2>
            <p className="mt-4 text-slate-400 text-lg">
              Comprehensive platform for managing OECD Pillar Two GloBE compliance,
              MNE filings, audits, and revenue collection.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">1,247</div>
              <div className="text-slate-400 text-sm">Registered MNEs</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">AED 2.45B</div>
              <div className="text-slate-400 text-sm">YTD Collections</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">94.2%</div>
              <div className="text-slate-400 text-sm">Compliance Rate</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">847</div>
              <div className="text-slate-400 text-sm">Filings Processed</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Shield className="h-4 w-4" />
          <span>Secure Government Portal • UAE Tax Authority</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">DMTT Administration</h1>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
