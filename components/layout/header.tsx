"use client"

import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useUser, getRoleDisplayName } from '@/contexts/user-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { currentUser, allUsers, setCurrentUser } = useUser();

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

        {/* Role Switcher (for demo) */}
        <Select
          value={currentUser.id}
          onValueChange={(value) => {
            const user = allUsers.find(u => u.id === value);
            if (user) setCurrentUser(user);
          }}
        >
          <SelectTrigger className="w-48 bg-slate-800 border-slate-600">
            <SelectValue>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {getRoleDisplayName(currentUser.role)}
                </Badge>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {allUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-slate-400">
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-white">
                  {currentUser.name}
                </span>
                <span className="text-xs text-slate-400">
                  {currentUser.department}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
