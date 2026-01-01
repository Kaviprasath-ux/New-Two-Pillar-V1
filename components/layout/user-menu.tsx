'use client';

import { useAuth } from '@/contexts/auth-context';
import { demoUsers } from '@/data/users';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, LogOut, User, Users, Settings } from 'lucide-react';

const roleLabels: Record<string, string> = {
  tax_officer: 'Tax Officer',
  senior_assessor: 'Senior Assessor',
  audit_manager: 'Audit Manager',
  policy_analyst: 'Policy Analyst',
  department_head: 'Department Head',
  system_admin: 'System Admin',
};

const roleColors: Record<string, string> = {
  tax_officer: 'bg-green-500/20 text-green-400 border-green-500/30',
  senior_assessor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  audit_manager: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  policy_analyst: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  department_head: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  system_admin: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function UserMenu() {
  const { user, logout, switchUser } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-slate-800">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white text-sm">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-white">{user.name}</span>
            <Badge variant="outline" className={`text-xs ${roleColors[user.role]}`}>
              {roleLabels[user.role]}
            </Badge>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-slate-900 border-slate-700">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-white">{user.name}</span>
          <span className="text-xs text-slate-400 font-normal">{user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-700" />

        <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700" />

        {/* Role Switcher (Demo Only) */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer hover:bg-slate-800">
            <Users className="h-4 w-4 mr-2" />
            <span>Switch Role (Demo)</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-slate-900 border-slate-700">
            {demoUsers.map((demoUser) => (
              <DropdownMenuItem
                key={demoUser.id}
                onClick={() => switchUser(demoUser.id)}
                className={`cursor-pointer hover:bg-slate-800 ${
                  user.id === demoUser.id ? 'bg-slate-800' : ''
                }`}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="bg-slate-700 text-white text-xs">
                    {demoUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">{demoUser.name}</span>
                  <span className="text-xs text-slate-400">{roleLabels[demoUser.role]}</span>
                </div>
                {user.id === demoUser.id && (
                  <span className="ml-auto text-xs text-green-400">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="bg-slate-700" />

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer hover:bg-red-500/10 text-red-400 focus:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
