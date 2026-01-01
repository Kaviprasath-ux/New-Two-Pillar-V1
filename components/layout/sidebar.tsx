"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { getNavigationForRole } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Landmark } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const navigation = getNavigationForRole(user.role);

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-700 bg-slate-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-700 px-6">
        <Landmark className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-lg font-bold text-white">DMTT Portal</h1>
          <p className="text-xs text-slate-400">Tax Authority</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.label}>
              <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {section.label}
              </h2>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              item.badgeVariant === 'danger'
                                ? 'destructive'
                                : item.badgeVariant === 'warning'
                                ? 'warning'
                                : 'secondary'
                            }
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <div className="text-xs text-slate-500">
          <p>Pillar Two DMTT Platform</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
