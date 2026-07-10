import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// التحقق من وجود المتغيرات البيئية
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure you have .env.local with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=...');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=...');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-client-info': 'alhadi-group@1.0.0',
    },
  },
});

// أنواع البيانات
export type ServiceRequest = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address: string;
  customer_city: string;
  service_category: string;
  sub_service?: string;
  description: string;
  urgency: 'urgent' | 'normal' | 'scheduled';
  location_link?: string;
  location_coords?: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  technician_id?: string;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
  admin_notes?: string;
  technician_notes?: string;
  images?: RequestImage[];
  technician?: Technician;
};

export type RequestImage = {
  id: string;
  request_id: string;
  image_url: string;
  uploaded_at: string;
};

export type Technician = {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  specialty: string;
  is_available: boolean;
  is_active: boolean;
  city?: string;
  rating: number;
  total_jobs: number;
  completed_jobs: number;
  created_at: string;
  user_id?: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
};