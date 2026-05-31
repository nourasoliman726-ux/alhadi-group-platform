'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getCurrentUserRole, UserRole } from './auth';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push('/dashboard/login');
          return;
        }

        if (requiredRole) {
          const role = await getCurrentUserRole();

          if (role !== requiredRole) {
            router.push('/dashboard');
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/dashboard/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="text-center">
          <Loader2 
            className="animate-spin mx-auto mb-4" 
            size={40}
            style={{ color: "#1e3a5f" }}
          />
          <p style={{ color: "#1e3a5f" }}>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}