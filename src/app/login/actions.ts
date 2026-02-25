'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// We keep a small map just for previously created admins so you don't lose admin access
const ADMIN_MAPPING: Record<string, string> = {
  'самойлова ирина алексеевна': 'samoilova.irina@buketov.kz',
  'канагат бейбарыс': 'kanagat.beibarys@buketov.kz'
};

export async function login(formData: FormData) {
  const supabase = await createClient()

  const rawName = formData.get('fullname') as string;
  const trimmedName = rawName?.trim();
  
  if (!trimmedName) {
      redirect('/login?error=' + encodeURIComponent('Пожалуйста, введите ваше имя и фамилию.'))
  }

  const normalizedName = trimmedName.toLowerCase();
  
  // Determine if it's an admin or a regular student
  // We use hex representation of the name to generate a strictly valid email.
  let email = `user_${Buffer.from(normalizedName).toString('hex')}@student.app`;
  let password = 'studentpassword123';
  
  if (ADMIN_MAPPING[normalizedName]) {
      email = ADMIN_MAPPING[normalizedName];
      password = 'adminpassword';
  }

  // 1. Attempt to sign in first (if user already exists)
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // 2. If user doesn't exist, sign in fails. We create them dynamically!
  if (signInError && !ADMIN_MAPPING[normalizedName]) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
          redirect(`/login?error=` + encodeURIComponent(`Ошибка сервера: Отсутствуют ключи API для Supabase.`));
      }

      // Create with admin client to bypass email confirmation
      const supabaseAdmin = createSupabaseClient(
        supabaseUrl,
        supabaseServiceKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: { full_name: trimmedName }
      });

      if (createError) {
          redirect(`/login?error=` + encodeURIComponent(`Не удалось создать аккаунт: ${createError.message}`))
      }

      // Explicitly set the profile role to student
      if (createData?.user) {
          await supabaseAdmin
            .from('profiles')
            .upsert({ id: createData.user.id, full_name: trimmedName, role: 'student' });
      }

      // Now sign in the newly created user
      const { error: newSignInError } = await supabase.auth.signInWithPassword({
          email,
          password
      });

      if (newSignInError) {
          redirect(`/login?error=` + encodeURIComponent(`Ошибка авторизации: ${newSignInError.message}`))
      }
  } else if (signInError) {
      redirect('/login?error=' + encodeURIComponent('Ошибка авторизации администратора.'))
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
