'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUserRole, getCurrentUser } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push('/dashboard/login');
          return;
        }

        const role = await getCurrentUserRole();

        if (role === 'admin') {
          router.push('/dashboard/admin');
        } else if (role === 'technician') {
          router.push('/dashboard/technician');
        } else {
          router.push('/dashboard/login');
        }
      } catch (error) {
        console.error('Error checking role:', error);
        router.push('/dashboard/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRedirect();
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <Loader2 className="animate-spin" size={40} style={{ color: "#1e3a5f" }} />
    </div>
  );
}