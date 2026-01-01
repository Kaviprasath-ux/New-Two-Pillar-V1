"use client"

import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserMenu } from '@/components/layout/user-menu';

export function Header() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-700 bg-slate-900 px-6">
      {/* Left side - Fiscal Year selector */}
      <div className="flex items-center gap-4">
        <Select defaultValue="FY2024">
          <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
            <SelectValue placeholder="Fiscal Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FY2024">FY2024</SelectItem>
            <SelectItem value="FY2023">FY2023</SelectItem>
            <SelectItem value="FY2022">FY2022</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            12
          </span>
        </Button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
