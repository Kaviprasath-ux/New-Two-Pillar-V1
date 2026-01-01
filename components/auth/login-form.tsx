'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, LogIn, AlertCircle, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { demoUsers } from '@/data/users';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const roleLabels: Record<string, string> = {
  tax_officer: 'Tax Officer',
  senior_assessor: 'Senior Assessor',
  audit_manager: 'Audit Manager',
  policy_analyst: 'Policy Analyst',
  department_head: 'Department Head',
  system_admin: 'System Admin',
};

const roleColors: Record<string, string> = {
  tax_officer: 'bg-green-500/10 text-green-400',
  senior_assessor: 'bg-blue-500/10 text-blue-400',
  audit_manager: 'bg-purple-500/10 text-purple-400',
  policy_analyst: 'bg-cyan-500/10 text-cyan-400',
  department_head: 'bg-amber-500/10 text-amber-400',
  system_admin: 'bg-red-500/10 text-red-400',
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const result = await login(data);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleQuickLogin = (email: string) => {
    setValue('email', email);
    setValue('password', 'demo123');
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white">Sign in</CardTitle>
        <CardDescription className="text-slate-400">
          Enter your credentials to access the DMTT Administration Portal
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@taxauthority.gov"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <Separator className="mb-4 bg-slate-700" />

        <div className="w-full">
          <p className="text-sm text-slate-400 mb-3 text-center">Demo Quick Login</p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
                <User className="h-4 w-4 mr-2" />
                Select Demo User
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-slate-900 border-slate-700">
              <DropdownMenuLabel className="text-slate-400">Choose a role to test</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              {demoUsers.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onClick={() => handleQuickLogin(user.email)}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-800"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-slate-400 text-sm">{user.email}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-xs text-slate-500 mt-3 text-center">
            Password for all demo users: <code className="bg-slate-800 px-1 rounded">demo123</code>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
