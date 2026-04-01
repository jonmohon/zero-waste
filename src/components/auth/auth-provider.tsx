/**
 * AuthProvider — client-side authentication context for the storefront.
 * Wraps the store layout to provide customer state and auth actions
 * to any child component via the useAuth() hook.
 */
"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Customer } from "@/lib/types";
import {
  getCustomer,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "@/lib/auth";

interface AuthContextValue {
  customer: Customer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCustomer = useCallback(async () => {
    const result = await getCustomer();
    setCustomer(result.success ? (result.data as Customer) : null);
  }, []);

  useEffect(() => {
    refreshCustomer().finally(() => setIsLoading(false));
  }, [refreshCustomer]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginCustomer(email, password);
    if (result.success) await refreshCustomer();
    return { success: result.success, error: result.error };
  }, [refreshCustomer]);

  const register = useCallback(async (email: string, password: string) => {
    const result = await registerCustomer(email, password);
    if (result.success) setCustomer(result.data as Customer);
    return { success: result.success, error: result.error };
  }, []);

  const logout = useCallback(async () => {
    await logoutCustomer();
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ customer, isLoading, isAuthenticated: !!customer, login, register, logout, refreshCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Default value returned when useAuth is called outside AuthProvider (e.g. during SSR prerender) */
const DEFAULT_AUTH: AuthContextValue = {
  customer: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => ({ success: false, error: "Not in auth context" }),
  register: async () => ({ success: false, error: "Not in auth context" }),
  logout: async () => {},
  refreshCustomer: async () => {},
};

/**
 * Hook to access auth state and actions.
 * Returns a safe default (unauthenticated) when used outside AuthProvider,
 * which happens during static prerendering of pages like /products/[handle].
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  return ctx ?? DEFAULT_AUTH;
}
