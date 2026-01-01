'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/types/auth';
import { validateCredentials, getUserById } from '@/data/users';

const AUTH_STORAGE_KEY = 'dmtt_auth_user';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const user = JSON.parse(stored) as User;
          // Verify user still exists and is active
          const validUser = getUserById(user.id);
          if (validUser && validUser.isActive) {
            setState({
              user: validUser,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = validateCredentials(credentials.email, credentials.password);

    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    router.push('/login');
  }, [router]);

  const switchUser = useCallback((userId: string) => {
    const user = getUserById(userId);
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      // Refresh to apply new permissions
      router.refresh();
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
