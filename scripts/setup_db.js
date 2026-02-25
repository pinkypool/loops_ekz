import { Client } from 'pg';

const connectionString = "postgresql://postgres.rmsdxckmgnkgmoyjaagb:Beibarys2003$@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres";

const client = new Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    
    const query = `
      create table if not exists public.user_progress (
        id uuid default gen_random_uuid() primary key,
        user_id uuid references auth.users not null,
        module_id text not null,
        lesson_id text not null,
        theory_score integer default 0,
        code_attempts integer default 0,
        time_spent_seconds integer default 0,
        is_completed boolean default false,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        unique (user_id, module_id, lesson_id)
      );

      alter table public.user_progress enable row level security;

      -- Drop policies if exists to allow rerun
      drop policy if exists "Users can insert their own progress" on public.user_progress;
      drop policy if exists "Users can update their own progress" on public.user_progress;
      drop policy if exists "Users can view their own progress" on public.user_progress;
      drop policy if exists "Admins can view all progress" on public.user_progress;

      create policy "Users can insert their own progress" 
      on public.user_progress for insert 
      with check (auth.uid() = user_id);

      create policy "Users can update their own progress" 
      on public.user_progress for update 
      using (auth.uid() = user_id);

      create policy "Users can view their own progress" 
      on public.user_progress for select 
      using (auth.uid() = user_id);

      create policy "Admins can view all progress" 
      on public.user_progress for select 
      using (
        exists (
          select 1 from public.profiles
          where profiles.id = auth.uid() and profiles.role = 'admin'
        )
      );
    `;

    await client.query(query);
    console.log("Table and RLS successfully created!");
  } catch (err) {
    console.error("Error creating table", err);
  } finally {
    await client.end();
  }
}

run();
