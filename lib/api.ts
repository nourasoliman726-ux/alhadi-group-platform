import { supabase } from './supabase';

// ===== الطلبات =====

// الحصول على كل الطلبات (للإدارة) - مع الصور
export async function getAllRequests() {
  const { data, error } = await supabase
    .from('service_requests')
    .select(`
      *,
      technician:technicians(id, full_name, phone, specialty, rating),
      images:request_images(id, image_url, uploaded_at)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// الحصول على طلبات الفني - مع الصور
export async function getTechnicianRequests(technicianId: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .select(`
      *,
      images:request_images(id, image_url, uploaded_at)
    `)
    .eq('technician_id', technicianId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// الحصول على طلب واحد - مع الصور
export async function getRequest(requestId: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .select(`
      *,
      images:request_images(id, image_url, uploaded_at),
      technician:technicians(id, full_name, phone, rating, specialty)
    `)
    .eq('id', requestId)
    .single();

  if (error) throw error;
  return data;
}

// تحديث حالة الطلب
export async function updateRequestStatus(requestId: string, status: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .update({
      status,
      updated_at: new Date().toISOString(),
      ...(status === 'completed' && { completed_at: new Date().toISOString() }),
    })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// إسناد الطلب للفني
export async function assignRequestToTechnician(
  requestId: string,
  technicianId: string
) {
  const { data, error } = await supabase
    .from('service_requests')
    .update({
      technician_id: technicianId,
      status: 'assigned',
      updated_at: new Date().toISOString(),
    })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// إضافة ملاحظة من الإدارة
export async function addAdminNote(requestId: string, note: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .update({
      admin_notes: note,
      updated_at: new Date().toISOString(),
    })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// إضافة ملاحظة من الفني
export async function addTechnicianNote(requestId: string, note: string) {
  const { data, error } = await supabase
    .from('service_requests')
    .update({
      technician_notes: note,
      updated_at: new Date().toISOString(),
    })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ===== الفنيون =====

// الحصول على كل الفنيين
export async function getAllTechnicians() {
  const { data, error } = await supabase
    .from('technicians')
    .select('*')
    .eq('is_active', true)
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

// الحصول على الفنيين المتاحين
export async function getAvailableTechnicians() {
  const { data, error } = await supabase
    .from('technicians')
    .select('*')
    .eq('is_available', true)
    .eq('is_active', true)
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

// تحديث بيانات الفني
export async function updateTechnician(
  technicianId: string,
  updates: Record<string, any>
) {
  const { data, error } = await supabase
    .from('technicians')
    .update(updates)
    .eq('id', technicianId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ===== الإحصائيات =====

export async function getDashboardStats() {
  const { data: requests } = await supabase
    .from('service_requests')
    .select('status');

  const stats = {
    total: requests?.length || 0,
    pending: requests?.filter((r) => r.status === 'pending').length || 0,
    assigned: requests?.filter((r) => r.status === 'assigned').length || 0,
    in_progress: requests?.filter((r) => r.status === 'in_progress').length || 0,
    completed: requests?.filter((r) => r.status === 'completed').length || 0,
  };

  return stats;
}

// ===== الرسائل =====

// الحصول على الرسائل
export async function getMessages(unreadOnly = false) {
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (unreadOnly) {
    query = query.eq('is_read', false);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

// تحديث قراءة الرسالة
export async function markMessageAsRead(messageId: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ===== صور الطلبات =====

// الحصول على صور الطلب
export async function getRequestImages(requestId: string) {
  const { data, error } = await supabase
    .from('request_images')
    .select('*')
    .eq('request_id', requestId)
    .order('uploaded_at', { ascending: false });

  if (error) throw error;
  return data;
}

// رفع صورة جديدة لطلب موجود
export async function uploadRequestImage(requestId: string, file: File) {
  try {
    // رفع الصورة إلى Storage
    const fileExtension = file.name.split('.').pop();
    const fileName = `${requestId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
    
    const { error: uploadError } = await supabase.storage
      .from('service-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // الحصول على رابط الصورة
    const { data: urlData } = supabase.storage
      .from('service-images')
      .getPublicUrl(fileName);

    // إضافة السجل في جدول request_images
    const { data, error: dbError } = await supabase
      .from('request_images')
      .insert([
        {
          request_id: requestId,
          image_url: urlData.publicUrl,
        },
      ])
      .select()
      .single();

    if (dbError) throw dbError;
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// حذف صورة
export async function deleteRequestImage(imageId: string, imageUrl: string) {
  try {
    // استخراج اسم الملف من الرابط
    const fileName = imageUrl.split('/service-images/')[1];
    
    // حذف من Storage
    const { error: storageError } = await supabase.storage
      .from('service-images')
      .remove([fileName]);

    if (storageError) throw storageError;

    // حذف من قاعدة البيانات
    const { error: dbError } = await supabase
      .from('request_images')
      .delete()
      .eq('id', imageId);

    if (dbError) throw dbError;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}