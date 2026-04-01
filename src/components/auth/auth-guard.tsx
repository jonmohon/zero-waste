/**
 * AuthGuard — protects routes that require authentication.
 * Redirects unauthenticated users to /signin, shows a loading
 * indicator while the session is being checked.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/signin");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <p className="py-12 text-center text-neutral-500">Loading...</p>;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
