import { supabase } from './supabase';

export type UserRole = 'technician' | 'admin';

// تسجيل دخول
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// إنشاء حساب جديد + تحديد الدور
export async function signUpWithRole(
  email: string,
  password: string,
  role: UserRole,
  fullName: string,
  phone?: string,
  specialty?: string,
  city?: string
) {
  // 1. إنشاء المستخدم
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error('User creation failed');

  // 2. حفظ الدور
  const { error: roleError } = await supabase
    .from('user_roles')
    .insert([{ user_id: userId, role }]);

  if (roleError) throw roleError;

  // 3. إذا كان فني، أضفه في جدول الفنيين
  if (role === 'technician') {
    const { error: techError } = await supabase
      .from('technicians')
      .insert([
        {
          full_name: fullName,
          email,
          phone: phone || '',
          specialty: specialty || '',
          city: city || '',
          user_id: userId,
        },
      ]);

    if (techError) throw techError;
  }

  return authData;
}

// الحصول على دور المستخدم الحالي
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  return (data?.role as UserRole) || null;
}

// تسجيل خروج
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// الحصول على المستخدم الحالي
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// الحصول على بيانات الفني
export async function getTechnicianData(userId: string) {
  const { data, error } = await supabase
    .from('technicians')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}