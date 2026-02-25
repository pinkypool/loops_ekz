import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const students = [
    { name: 'Акаш Ильяс', email: 'akash.ilyas@buketov.kz', password: 'password123' },
    { name: 'Жанибек Мақсат', email: 'zhanibek.maksat@buketov.kz', password: 'password123' },
    { name: 'Дуйсембаев Алиаскар', email: 'duysembaev.aliaskar@buketov.kz', password: 'password123' },
    { name: 'Имекбаев Рустем', email: 'imebaev.rustem@buketov.kz', password: 'password123' },
    { name: 'Каиржанов Алишер', email: 'kairzhanov.alisher@buketov.kz', password: 'password123' },
    { name: 'Лебаев Әлішер', email: 'lebaev.alisher@buketov.kz', password: 'password123' },
    { name: 'Лебаева Айгерим', email: 'lebaeva.aigerim@buketov.kz', password: 'password123' },
    { name: 'Мехтиев Чингиз', email: 'mehtiev.chingiz@buketov.kz', password: 'password123' },
    { name: 'Нұрғали Айдос', email: 'nurgali.aidos@buketov.kz', password: 'password123' },
    { name: 'Рольгейзер Арсений', email: 'rolgeyzer.arseniy@buketov.kz', password: 'password123' }
  ];

  const admins = [
    { name: 'Самойлова Ирина Алексеевна', email: 'samoilova.irina@buketov.kz', password: 'adminpassword', role: 'admin' },
    { name: 'Канагат Бейбарыс', email: 'kanagat.beibarys@buketov.kz', password: 'adminpassword', role: 'admin' }
  ];

  const allUsers = [...students, ...admins];
  const results = [];

  for (const user of allUsers) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { full_name: user.name }
    });

    if (error) {
      results.push({ user: user.name, status: 'error', message: error.message });
    } else {
      results.push({ user: user.name, status: 'success', id: data.user.id });
      
      // If we don't have triggers working we can set role manully
      // @ts-expect-error role is optionally on admins array elements
      if (user.role === 'admin') {
         // Create profile explicitly
         const { error: profileError } = await supabaseAdmin
           .from('profiles')
           .upsert({ id: data.user.id, full_name: user.name, role: 'admin' });
           
         if(profileError) {
             results.push({ user: user.name, status: 'profile_error', message: profileError.message });
         }
      } else {
          // create student profile
         const { error: profileError } = await supabaseAdmin
           .from('profiles')
           .upsert({ id: data.user.id, full_name: user.name, role: 'student' });
      }
    }
  }

  return NextResponse.json({ results });
}
